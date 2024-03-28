import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

const CATEGORIES = [
  {
    name: "Pessoas",
    imageBefore: "woman-2-before.jpeg",
    imageAfter: "woman-2-after.png",
  },
  {
    name: "Natureza",
    imageBefore: "nature-2-before.png",
    imageAfter: "nature-2-after.png",
  },
  {
    name: "Animais",
    imageBefore: "cat-before.jpg",
    imageAfter: "cat-after.png",
  },
  {
    name: "Anime",
    imageBefore: "anime-before.jpg",
    imageAfter: "anime-after.png",
  },
];

export default function ExampleSection({ hideText = false }) {
  return (
    <section
      className={cn(
        "py-16 md:py-28 w-full  gap-8 items-center",
        !hideText && "grid grid-cols-1 md:grid-cols-2"
      )}
    >
      {!hideText && (
        <div className="mb-8 gap-4 flex flex-col items-center md:items-start justify-center md:justify-start text-center md:text-start order-1 md:order-2">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold ">
            Deixe sua imagem com uma qualidade impecável
          </h2>

          <p className="text-sm md:text-base">
            Muitas vezes tiramos uma foto e ela não fica com boa qualidade como
            queremos - Ou, temos uma imagem antiga de nossa família e queremos
            ver como ela ficaria em HD.
          </p>
          <p className="text-sm md:text-base">
            Graças à inteligência artificial da PhotosHD, você consegue melhorar
            sua imagem ou foto com apenas um clique, sem precisar de dores de
            cabeça.
          </p>

          <Button className="mt-5 px-6 py-4 text-lg">
            <Link href="/upload">Testar Agora</Link>
          </Button>
        </div>
      )}
      <div className="flex flex-col items-center order-2 md:order-1 px-4">
        <Tabs defaultValue={CATEGORIES[0].name}>
          <TabsList className="flex py-2 space-x-1 sm:space-x-3 bg-transparent justify-center overflow-x-scroll md:overflow-hidden sm:px-8 no-scrollbar">
            {CATEGORIES.map((category) => (
              <TabsTrigger
                key={category.name}
                value={category.name}
                className="bg-secondary font-bold rounded-full h-11 px-3 sm:px-4 hover:opacity-70 text-secondary-foreground data-[state=active]:bg-primary/60 data-[state=active]:text-primary-foreground transition-all duration-100"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {CATEGORIES.map((category) => (
            <TabsContent
              key={category.name}
              value={category.name}
              className="mx-auto w-full  max-w-xl sm:max-w-3xl md:max-w-5xl mt-4"
            >
              <ReactCompareSlider
                itemOne={
                  <ReactCompareSliderImage
                    src={`./examples/${category.imageBefore}`}
                    alt="Imagem Antes de ser melhorada."
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={`./examples/${category.imageAfter}`}
                    alt="Imagem Apos ser melhorada."
                  />
                }
                className="rounded-3xl h-[300px] sm:h-[450px] md:h-[600px]"
              />
            </TabsContent>
          ))}
        </Tabs>
        {/* <Link
          href="/exemplos"
          className="group transition-all duration-200 text-center font-light mt-2"
        >
          Veja mais exemplos
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-px bg-primary"></span>
        </Link> */}
      </div>
    </section>
  );
}
