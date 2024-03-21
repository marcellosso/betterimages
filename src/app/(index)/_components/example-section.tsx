import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    imageBefore: "nature-before.png",
    imageAfter: "nature-after.png",
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

export default function ExampleSection() {
  return (
    <section className="py-12 md:py-24 w-full flex flex-col items-center">
      <h2 className="font-bold text-4xl md:text-5xl text-center py-4 md:py-8">
        Máxima Qualidade
      </h2>
      <Tabs defaultValue={CATEGORIES[0].name}>
        <TabsList className="flex py-2 space-x-3 bg-transparent justify-start md:justify-center overflow-x-scroll md:overflow-hidden px-8 no-scrollbar">
          {CATEGORIES.map((category) => (
            <TabsTrigger
              key={category.name}
              value={category.name}
              className="bg-secondary font-bold rounded-full h-11 px-4 hover:opacity-70 text-secondary-foreground data-[state=active]:bg-primary/60 data-[state=active]:text-primary-foreground transition-all duration-100"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map((category) => (
          <TabsContent
            key={category.name}
            value={category.name}
            className="mx-auto w-full max-w-5xl px-8 mt-4"
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
              className="rounded-3xl h-[600px]"
            />
          </TabsContent>
        ))}
      </Tabs>
      <div className="w-fit mt-2">
        <Link
          href="/exemplos"
          className="group transition-all duration-200 text-center font-light"
        >
          Veja mais exemplos
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-px bg-primary"></span>
        </Link>
      </div>
    </section>
  );
}
