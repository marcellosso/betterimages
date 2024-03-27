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
          Existem umas 20 milhões de atividades mais interessantes do que
          remover fundos de imagens à mão.
        </p>
        <Separator className="bg-primary" />
        <p className="text-xs md:text-sm">
          Graças à inteligência artificial do remove.bg, você pode reduzir o seu
          tempo de edição - e divertir-se mais!
        </p>
        <Button className="mt-5 sm:px-8 sm:py-6 px-6 py-4 text-lg max-sm:self-center w-fit">
          <Link href="/upload">Testar Agora</Link>
        </Button>
      </div>
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={`./examples/frog-before.png`}
            alt="Imagem Antes de ser melhorada."
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={`./examples/frog-after.png`}
            alt="Imagem Apos ser melhorada."
          />
        }
        className="rounded-3xl "
      />
    </div>
  );
}
