import { UploadForm } from "@/components/upload-form";
import { StarIcon } from "lucide-react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export default function MainSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 pt-4 pb-8">
      <div className="flex flex-col items-center md:items-start justify-center w-full">
        <header className="mb-8 gap-4 flex w-full flex-col items-start justify-center md:justify-start">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-start">
            Cansado de Baixa Qualidade?
          </h1>
          <p className="opacity-60 text-sm md:text-base">
            Melhore a qualidade da sua foto com apenas{" "}
            <span className="bg-primary rounded-sm text-secondary-foreground ">
              um clique
            </span>
          </p>
        </header>
        <UploadForm />
        <div className="flex items-center gap-4 pt-2">
          <p className="text-letter text-sm font-light">
            Confiado por +1000 usuários
          </p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon key={i} color="#FFD369" size={18} fill="#FFD369" />
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 col-span-2 max-md:mt-8">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={"./examples/woman-before.png"}
              alt="Antes de ser melhorada - Foto borrada de uma mulher loira com olhos azuis esverdeados."
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={"./examples/woman-after.png"}
              alt="Depois de ser melhorada - Foto em HD de uma mulher loira com olhos azuis esverdeados."
            />
          }
          className="rounded-3xl"
        />
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={"./examples/man-before.png"}
              alt="Antes de ser melhorada - Foto borrada de um homem moreno com olhos castanho claro."
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={"./examples/man-after.png"}
              alt="Depois de ser melhorada - Foto em HD de um homem moreno com olhos castanho claro"
            />
          }
          className="rounded-3xl"
        />
      </div>
    </section>
  );
}
