import { Button } from "@/components/ui/button";
import Link from "next/link";
import InstagramPost from "./instagram-post";

export default function SocialMediaSection() {
  return (
    <section className="pb-16 md:pb-28 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="mb-8 gap-4 flex flex-col items-center md:items-start justify-center md:justify-start text-center md:text-start ">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold ">
          Deixe sua imagem com uma qualidade impecável
        </h2>

        <p className="text-sm md:text-base">
          Existem umas 20 milhões de atividades mais interessantes do que
          remover fundos de imagens à mão.
        </p>
        <p className="text-sm md:text-base">
          Graças à inteligência artificial do remove.bg, você pode reduzir o seu
          tempo de edição - e divertir-se mais!
        </p>

        <Button className="mt-5 px-6 py-4 text-lg">
          <Link href="/upload">Testar Agora</Link>
        </Button>
      </div>
      <div className="flex flex-col items-center">
        <InstagramPost />
      </div>
    </section>
  );
}
