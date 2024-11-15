import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { GiMaterialsScience } from "react-icons/gi";
import { GiMusicalScore } from "react-icons/gi";
import { FaLanguage } from "react-icons/fa";
import { GiStoneCrafting } from "react-icons/gi";
import { HiLightBulb } from "react-icons/hi";
import { GiWaterRecycling } from "react-icons/gi";
import { FaBaby } from "react-icons/fa6";
import { GiVacuumCleaner } from "react-icons/gi";
import { FaHandSpock } from "react-icons/fa";
import { GiLipstick } from "react-icons/gi";
import { MdArchitecture } from "react-icons/md";
import { GiSofa } from "react-icons/gi";
import { AiOutlineFormatPainter } from "react-icons/ai";
import { FaFileVideo } from "react-icons/fa";
import { FaCameraRetro } from "react-icons/fa";
import { DiPhotoshop } from "react-icons/di";

export function Category() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Боловсрол</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Математикийн багш{" "}
            <MenubarShortcut>
              <GiMaterialsScience />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Төгөлдөр хуурын багш{" "}
            <MenubarShortcut>
              <GiMusicalScore />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Гадаад хэлний багш
            <MenubarShortcut>
              <FaLanguage />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Дизайн ба Урлаг</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            График дизайнер
            <MenubarShortcut>
              <DiPhotoshop />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Гэрэл зурагчин
            <MenubarShortcut>
              <FaCameraRetro />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Video Editor
            <MenubarShortcut>
              <FaFileVideo />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Барилга, Интерьер</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Интерьер дизайнер
            <MenubarShortcut>
              <GiSofa />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Архитектор
            <MenubarShortcut>
              <MdArchitecture />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Барилгын дотоод засварчин
            <MenubarShortcut>
              <AiOutlineFormatPainter />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Орчуулга</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Англи хэл
            <MenubarShortcut>En</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Орос хэл
            <MenubarShortcut>Ru</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Япон хэл
            <MenubarShortcut>Jp</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Герман хэл
            <MenubarShortcut>De</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Гэр ахуй</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Цахилгаанчин
            <MenubarShortcut>
              <HiLightBulb />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Мужаан
            <MenubarShortcut>
              <GiStoneCrafting />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Сантехникч
            <MenubarShortcut>
              <GiWaterRecycling />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Хүүхэд асрагч
            <MenubarShortcut>
              <FaBaby />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Цэвэрлэгээ
            <MenubarShortcut>
              <GiVacuumCleaner />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Гоо сайхан</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Make up artist
            <MenubarShortcut>
              <GiLipstick />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Manicure Pedicure
            <MenubarShortcut>
              <FaHandSpock />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
