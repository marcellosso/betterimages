import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ImageUpscaleEmailProps {
  imageUrl: string;
}

export const ImageUpscaleEmail = ({ imageUrl }: ImageUpscaleEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>PhotosHD - Resultado da Imagem</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Text style={{ fontWeight: 600, fontSize: 32 }}>
              <span>photos</span>
              <span style={{ fontWeight: 800, color: "#f97316" }}>hd</span>
            </Text>
          </Section>

          <Section style={content}>
            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column align="center">
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    marginBottom: 0,
                  }}
                >
                  Sua imagem está pronta
                </Heading>

                <Img style={image} width={400} src={imageUrl} />
              </Column>
            </Row>
            <Row
              style={{
                ...boxInfos,
                paddingTop: "10px",
              }}
            >
              <Column align="center">
                <Button
                  style={button}
                  href="https://www.photoshd.com.br/upload"
                >
                  Melhorar outra
                </Button>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column align="center">
                <Button style={buttonSecondary} href={imageUrl} download>
                  Baixar imagem
                </Button>
              </Column>
            </Row>
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2024 | PhotosHD | www.photoshd.com.br
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

ImageUpscaleEmail.PreviewProps = {
  imageUrl:
    "https://replicate.delivery/pbxt/KZVIDUcU15XCjloQMdqitfzi6pau7rO70IuGgdRAyHgku70q/13_before.png",
} as ImageUpscaleEmailProps;

export default ImageUpscaleEmail;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const logo = {
  padding: "0px 0px",
};

const button = {
  backgroundColor: "#f97316",
  borderRadius: 3,
  color: "#eee",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const buttonSecondary = {
  backgroundColor: "#292524",
  borderRadius: 3,
  color: "#eee",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
  borderRadius: "3px",
};

const boxInfos = {
  padding: "20px",
};
