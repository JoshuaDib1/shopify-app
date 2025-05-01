import { Page, Card, Button } from "@shopify/polaris";
import { useState } from "react";

export default function AppHomePage() {
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    setLoading(true);
    const response = await fetch("/api/upload-section", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: "text-with-image" }), // Nombre del archivo en sections/
    });
    const data = await response.json();
    setLoading(false);
    if (data.success) {
      alert("Sección subida correctamente");
    } else {
      alert("Error al subir sección: " + data.error);
    }
  };

  return (
    <Page title="Secciones Personalizadas">
      <Card>
        <Button onClick={handleUpload} loading={loading}>
          Subir sección "Hero"
        </Button>
      </Card>
    </Page>
  );
}