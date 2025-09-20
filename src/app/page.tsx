 import MainSlider from "./- components/MainSlider";
import CategorySlider from "./- components/CategorySlider/CategorySlider";
import AllProducts from "./- components/AllProducts/AllProducts";
 import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
 
export default async function Home() {
 const test = await getServerSession(authOptions) ;
 console.log(test);
 
  return (
    <>
    <MainSlider/>
    <CategorySlider/>
    <AllProducts/>
   </>
  );
}
