import svgPaths from "../../imports/svg-xr1cfiwiqc";
import { products } from "../products";

function ProductThumbnail({
  img,
  bgColor,
  hueColor,
}: {
  img: string;
  bgColor: string;
  hueColor: string;
}) {
  return (
    <div className="relative rounded-[22px] shrink-0 size-[94px] overflow-hidden">
      <div className="absolute inset-0 rounded-[22px]" style={{ backgroundColor: bgColor }} />
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover rounded-[22px]"
        src={img}
      />
      <div
        className="absolute inset-0 mix-blend-hue rounded-[22px]"
        style={{ backgroundColor: hueColor }}
      />
    </div>
  );
}

export function BottomSection({
  currentIndex,
  onPrev,
  onNext,
}: {
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const currentProduct = products[currentIndex];

  return (
    <div className="flex items-end justify-between pb-8 gap-8">
      {/* Left: Description container */}
      <div className="flex flex-col gap-5 max-w-[400px]">
        <div className="overflow-hidden h-auto">
          <h2
            className="text-[#f5f5f5] text-[48px] tracking-[0.48px]"
            style={{
              fontFamily: "'Neue Montreal', sans-serif",
              lineHeight: 1.054,
              fontWeight: 400,
            }}
          >
            {currentProduct.name}
          </h2>
        </div>
        <p
          className="text-[#f5f5f5] text-[20px] tracking-[0.2px]"
          style={{
            fontFamily: "'Neue Montreal', sans-serif",
            lineHeight: 1.24,
            fontWeight: 400,
          }}
        >
          {currentProduct.subtitle}
        </p>
        <p
          className="text-white text-[18px] max-w-[379px]"
          style={{
            fontFamily: "'Neue Montreal', sans-serif",
            lineHeight: 1.17,
            fontWeight: 400,
          }}
        >
          Cool down the Philly way — real water ice, real fruit flavor, no cap. Made fresh, served icy, and hitting different since day one
        </p>
      </div>

      {/* Right: Arrows container */}
      <div className="flex gap-3 items-end">
        {/* Left arrow */}
        <button
          onClick={onPrev}
          className="size-[80px] rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-white/90 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 6L9 12L15 18"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {/* Right arrow */}
        <button
          onClick={onNext}
          className="size-[80px] rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-white/90 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6L15 12L9 18"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}