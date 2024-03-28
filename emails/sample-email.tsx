import { Button, Html, Img } from "@react-email/components";

export default function SampleEmail() {
  return (
    <Html>
      <Img
        style={{ maxWidth: "100%" }}
        width={620}
        src="https://replicate.delivery/pbxt/14qgrcVZmxYEHNGRTFWwP4SWH9vnGB0c623Axlg4Nj1kk7oE/out.png"
      />
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>
  );
}
