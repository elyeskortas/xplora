'use strict';

/**
 * Migration script
 * - Normalizes vinyl.category to vinyl.category_slug (canonical slug)
 * - Ensures vinyl.stock is numeric
 * - Ensures boolean fields are normalized
 * - Sets user.role = 'artist' when artistProfile exists and role isn't set
 *
 * Usage:
 *  node scripts/migrate-categories-and-users.js [--dry-run]
 *
 * The script reads MONGODB_URI or MONGO_URI from the environment. If none is
 * provided it will try mongodb://localhost:27017/vinylia
 */

const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const MONGO = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/vinylia';
const DRY = process.argv.includes('--dry-run');

function slugify(input) {
  if (!input) return '';
  // basic ascii/diacritics removal and slugging
  const from = 'ÁÀÂÄÆÃÅĀáàâäæãåāĆČÇćčçĎĐďđÉÈÊËĒéèêëēÍÌÎÏĪíìîïīŃñńÓÒÔÖÕØŌóòôöõøōŘŕŔŚŠŞśšşŤŢťţÚÙÛÜŪúùûüūÝŸýÿŽŹŻžźż',
        to   = 'AAAAAAAaaaaaaaCCCcDdDDEEEEEeeeeeIIIIIIiiiiinnoooooooRrRSSSsssTTTtUUUUUuuuuuYYyyZZZzzz';
  let s = input.split('').map(c => {
    const idx = from.indexOf(c);
    return idx > -1 ? to[idx] : c;
  }).join('');
  s = s.toLowerCase().trim();
  s = s.replace(/&/g, 'and');
  s = s.replace(/[^a-z0-9]+/g, '-');
  s = s.replace(/^-+|-+$/g, '');
  s = s.replace(/--+/g, '-');
  return s;
}

// map of legacy category values (common variants) to canonical slugs
const CATEGORY_OVERRIDES = {
  'rock & indie': 'rock-and-indie',
  'rock and indie': 'rock-and-indie',
  'rockandindie': 'rock-and-indie',
  'électro & lo-fi': 'electro-and-lo-fi',
  'electro & lo-fi': 'electro-and-lo-fi',
  'electro and lo-fi': 'electro-and-lo-fi',
  'electroandlofi': 'electro-and-lo-fi',
  'house': 'house',
  'techno': 'techno',
  'jazz & blues': 'jazz-and-blues',
  'jazz and blues': 'jazz-and-blues',
  'jazzandblues': 'jazz-and-blues'
};

async function main() {
  console.log('Connecting to', MONGO, DRY ? '(dry run)' : '');
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });

  // require models from project
  const Vinyl = require(path.join(process.cwd(), 'src', 'models', 'vinyl'));
  const User = require(path.join(process.cwd(), 'src', 'models', 'user'));

  // if the model file exports the Mongoose model as .default (ESM transpile), handle both
  const VinylModel = (Vinyl && Vinyl.default) ? Vinyl.default : Vinyl;
  const UserModel = (User && User.default) ? User.default : User;

  // Vinyl migration
  console.log('\nScanning vinyls...');
  const vinyls = await VinylModel.find({}).lean();
  let vinylUpdated = 0;
  for (const v of vinyls) {
    const updates = {};

    // Normalize category -> category_slug
    const rawCategory = (v.category || v.genre || v.category_slug || '') + '';
    let slug = '';
    if (v.category_slug && typeof v.category_slug === 'string' && v.category_slug.trim()) {
      // already has slug-like value, keep it but ensure it's slugified
      slug = slugify(v.category_slug);
    } else if (rawCategory) {
      const candidate = rawCategory.toString().trim().toLowerCase();
      if (CATEGORY_OVERRIDES[candidate]) slug = CATEGORY_OVERRIDES[candidate];
      else slug = slugify(rawCategory);
    }
    if (slug && v.category_slug !== slug) updates.category_slug = slug;

    // Ensure stock is numeric
    const stock = Number(v.stock);
    if (!Number.isFinite(stock) || Number.isNaN(stock)) {
      // try parseInt on strings like '10 pcs'
      const parsed = parseInt((v.stock || '').toString().replace(/[^0-9\-]/g, ''), 10);
      updates.stock = Number.isFinite(parsed) ? parsed : 0;
    } else if (v.stock !== stock) updates.stock = stock;

    // Normalize booleans
    const boolFields = ['bestSeller', 'newArrival', 'bestseller', 'newArrival'];
    for (const key of ['bestSeller','newArrival']){
      const current = v[key];
      let normalized = false;
      if (typeof current === 'boolean') normalized = current;
      else if (typeof current === 'string') normalized = ['1','true','yes'].includes(current.toLowerCase());
      else if (typeof current === 'number') normalized = current > 0;
      if (current !== normalized) updates[key] = normalized;
    }

    if (Object.keys(updates).length > 0) {
      vinylUpdated++;
      console.log('Will update vinyl', v._id || v.id, updates);
      if (!DRY) {
        await VinylModel.updateOne({ _id: v._id || v.id }, { $set: updates }).exec();
      }
    }
  }
  console.log(`Vinyls scanned: ${vinyls.length}. Documents to update: ${vinylUpdated}`);

  // User migration
  console.log('\nScanning users...');
  const users = await UserModel.find({}).lean();
  let userUpdated = 0;
  for (const u of users) {
    const updates = {};
    // Ensure role exists
    if (!u.role) updates.role = 'user';

    // If artistProfile exists and role !== 'artist' then set role
    if (u.artistProfile && (!u.role || u.role !== 'artist')) {
      updates.role = 'artist';
      // ensure artistProfile fields are arrays/strings in expected shape
      const ap = u.artistProfile || {};
      const apUpdates = {};
      if (ap.externalLinks && Array.isArray(ap.externalLinks)) {
        // ok
      } else if (ap.externalLinks && typeof ap.externalLinks === 'string') {
        apUpdates['artistProfile.externalLinks'] = ap.externalLinks.split(',').map(s => s.trim()).filter(Boolean);
      }
      if (Object.keys(apUpdates).length) Object.assign(updates, apUpdates);
    }

    if (Object.keys(updates).length > 0) {
      userUpdated++;
      console.log('Will update user', u._id || u.id, updates);
      if (!DRY) {
        await UserModel.updateOne({ _id: u._id || u.id }, { $set: updates }).exec();
      }
    }
  }
  console.log(`Users scanned: ${users.length}. Documents to update: ${userUpdated}`);

  if (DRY) console.log('\nDry run complete. No changes written. Rerun without --dry-run to apply updates.');
  else console.log('\nMigration finished.');

  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
