import { json } from "@remix-run/node";
import fs from "fs";
import path from "path";

export const action = async ({ request, context }: { request: Request, context: any }) => {
  const { admin } = context.shopify;
  console.log(admin);

  const { fileName } = await request.json(); // ejemplo: "hero"

  try {
    const filePath = path.resolve("sections", `${fileName}.liquid`);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // 1. Buscar el theme principal
    const themesRes = await admin.rest.get({
      path: "themes",
    });

    const mainTheme = themesRes.body.themes.find((theme: any) => theme.role === "main");

    // 2. Subir sección
    await admin.rest.put({
      path: `themes/${mainTheme.id}/assets`,
      data: {
        asset: {
          key: `sections/${fileName}.liquid`,
          value: fileContent,
        },
      },
      type: "application/json",
    });

    return json({ success: true });
  } catch (error) {
    console.error(error);
    return json({ success: false, error: (error as Error).message }, { status: 500 });
  }
};