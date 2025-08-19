import ImageUploader from "@/components/admin/ImageUploader"

function VinylForm() {
  const [image, setImage] = useState("")

  return (
    <div>
      <ImageUploader onUploaded={(filename) => setImage(filename)} />
      <p className="mt-2">Image enregistrée : <strong>{image}</strong></p>
    </div>
  )
}