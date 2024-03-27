import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export default function ImageSection() {
  return (
    <div className="container px-0 sm:px-12 w-full pb-16 md:pb-28">
      <h4 className="font-bold text-xl sm:text-2xl md:text-4xl text-center pb-4">
        Recupere a imagem perdida
      </h4>
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={`./examples/nature-3-before.jpg`}
            alt="Imagem Antes de ser melhorada."
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={`./examples/nature-3-after.png`}
            alt="Imagem Apos ser melhorada."
          />
        }
        className="rounded-3xl w-full"
      />
    </div>
  );
}
