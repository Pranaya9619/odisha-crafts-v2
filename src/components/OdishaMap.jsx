import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import OdishaSVG from "../assets/OdishaMap.svg?react";

const districtData = {
    Angul: "Brass & Bell Metal",
    Balangir: "Handloom Textiles",
    Bargarh: "Sambalpuri Ikat",
    Boudh: "Wood Craft",
    Bhadrak: "Applique Work",
    Cuttack: "Silver Filigree",
    Deogarh: "Tribal Crafts",
    Dhenkanal: "Dokra Art",
    Gajapati: "Tribal Weaving",
    Ganjam: "Stone Carving",
    Jagatsinghpur: "Palm Leaf Craft",
    Jajpur: "Terracotta",
    Jharsuguda: "Metal Crafts",
    Kalahandi: "Dokra & Tribal Art",
    Kandhamal: "Bamboo Craft",
    Kendrapara: "Grass Mats",
    Keonjhar: "Iron Craft",
    Khordha: "Pattachitra",
    Koraput: "Tribal Textiles",
    Malkangiri: "Tribal Handicrafts",
    Mayurbhanj: "Sabai Grass Craft",
    Nabarangpur: "Tribal Jewelry",
    Nayagarh: "Palm Leaf Engraving",
    Nuapada: "Handloom",
    Puri: "Pattachitra",
    Rayagada: "Dongria Textiles",
    Sambalpur: "Sambalpuri Ikat",
    Sonepur: "Handloom Weaving",
    Sundargarh: "Tribal Metal Craft",
};

const OdishaMap = () => {
    const navigate = useNavigate();
    const [tooltip, setTooltip] = useState(null);

    return (
        <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-stone-200 h-full">

            {/* Heading */}
            <div className="mb-8">
                <h3 className="text-3xl font-serif font-bold text-stone-900 mb-3">
                    Explore by District
                </h3>

                <p className="text-stone-600">
                    Journey through Odisha’s artisan regions.
                </p>
            </div>

            {/* Map */}
            <div className="relative w-full overflow-hidden mt-10 flex justify-center">

                {tooltip && (
                    <div
                        style={{
                            left: tooltip.x,
                            top: tooltip.y,
                        }}
                        className="
      absolute
      z-50
      pointer-events-none

      -translate-x-1/2
      -translate-y-full

      bg-black/90
      text-white

      px-4
      py-3

      rounded-2xl

      shadow-2xl
      backdrop-blur-md
      border border-white/10
    "
                    >
                        <p className="font-semibold text-sm">
                            {tooltip.name}
                        </p>

                        <p className="text-orange-300 text-xs mt-1">
                            {tooltip.craft}
                        </p>
                    </div>
                )}

                <OdishaSVG
                    className="
            w-full
            max-w-[520px]
            h-auto

            [&_path]:fill-stone-300
            [&_path]:stroke-white
            [&_path]:stroke-[1]

            [&_path]:transition-all
            [&_path]:duration-300

            [&_path]:cursor-pointer

            [&_path:hover]:fill-orange-600

            [&_path:hover]:drop-shadow-[0_0_10px_rgba(234,88,12,0.7)]

            [&_text]:fill-stone-700
            [&_text]:font-semibold
            [&_text]:pointer-events-none
          "

                    onMouseMove={(e) => {
                        const target = e.target;

                        if (
                            target.tagName !== "path" ||
                            !target.id
                        ) {
                            setTooltip(null);
                            return;
                        }

                        const rect =
                            e.currentTarget.getBoundingClientRect();

                        setTooltip({
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                            name: target.id,
                            craft:
                                districtData[target.id] ||
                                "Traditional Crafts",
                        });
                    }}

                    onMouseLeave={() => {
                        setTooltip(null);
                    }}

                    onClick={(e) => {
                        const target = e.target;

                        if (
                            target.tagName === "path" &&
                            target.id
                        ) {
                            navigate(
                                `/shop?district=${encodeURIComponent(
                                    target.id
                                )}`
                            );
                        }
                    }}




                />

            </div>
        </div>
    );
};

export default OdishaMap;