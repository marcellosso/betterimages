import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export default function CTASection() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center rounded-lg bg-card-foreground max-w-5xl w-fit sm:w-full py-4 px-6 gap-4 text-card">
      <div className="flex flex-col gap-4 max-w-xs sm:max-w-sm md:max-w-lg max-sm:text-center">
        <h5 className="font-bold text-lg sm:text-xl md:text-2xl">
          Melhore suas imagens com nossa IA
        </h5>
        <p className="text-xs md:text-sm">
          Possuí uma imagem antiga de família que queria recuperar? Gostaria de
          postar uma foto em suas redes sociais porém ela ficou com baixa
          qualidade?
        </p>
        <Separator className="bg-primary" />
        <p className="text-xs md:text-sm">
          Deixe nossa tecnologia de Inteligência Artificial resolver seus
          problemas. Com apenas um clique você consegue melhorar suas fotos e
          deixá-las em HD - Teste agora gratuítamente
        </p>
        <Button className="mt-5 sm:px-8 sm:py-6 px-6 py-4 text-lg max-sm:self-center w-fit">
          <Link href="/upload">Melhore sua foto</Link>
        </Button>
      </div>
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={`./examples/frog-before.png`}
            alt="Imagem de um sapo colorido granulada antes de ser melhorada."
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={`./examples/frog-after.png`}
            alt="Imagem de um sapo colorido em HD apos ser melhorada."
          />
        }
        className="rounded-3xl "
      />
    </div>
  );
}
