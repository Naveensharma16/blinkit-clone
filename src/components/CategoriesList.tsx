import babycare from "../assets/icons/babycareicon.avif";
import bakery from "../assets/icons/bakeryicon.avif";
import breakfast from "../assets/icons/breakfasticon.avif";
import dairy from "../assets/icons/dairyicon.avif";
import fruit from "../assets/icons/fruitsicon.avif";
import medicine from "../assets/icons/medicinesicon.avif";
import petcare from "../assets/icons/petcareicon.avif";
import snacks from "../assets/icons/snacksicon.avif";
import sweets from "../assets/icons/sweeticon.avif";

const categoryicons = [
  babycare,
  bakery,
  breakfast,
  dairy,
  fruit,
  medicine,
  petcare,
  snacks,
  sweets,
];

export default function CategoriesList() {
  return (
    <>
      {categoryicons.map((item, index) => {
        return (
          <div className="single-category-icon" key={index}>
            <img src={item} alt="" />
          </div>
        );
      })}
    </>
  );
}
