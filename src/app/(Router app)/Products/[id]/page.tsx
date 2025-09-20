import OneProduct from '@/Api/OneProduct';
import AddBtn from '@/app/- components/Btn/AddBtn';
import Details from '@/app/- components/Details/Details';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import getRelatedProducts from '@/ProductCategoryAction/relatedProducts.action';
import { productType } from '@/Types/products.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const data = await OneProduct(id);
  if (!data) return <h1 className="text-3xl text-center text-red-600">No Products</h1>;

  const RelatedProducts = await getRelatedProducts(data.category._id);

  return (
    <>
      {/* Product Details Section */}
      <Details data={data} />

      {/* Related Products Section */}
      <div className="container w-[85%] mx-auto my-12">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center">
          Related Products
        </h2>

        <div className="flex flex-wrap -mx-3">
          {RelatedProducts.data.map((prod: productType) => (
            <div
              className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 px-3 mb-8"
              key={prod.id}
            >
              <Card
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl 
                           transition-all duration-300 transform hover:-translate-y-2 p-4 hover:border-2 hover:border-green-600 border-white " 
              >
                <Link href={`/Products/${prod.id}`}>
                  <CardHeader className="p-0">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        className="w-full h-[200px] object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
                        src={prod.imageCover}
                        width={300}
                        height={200}
                        alt="cover"
                      />
                    </div>
                    <p className="mx-auto mt-3 text-sm font-medium text-emerald-600">
                      {prod.category?.name}
                    </p>
                  </CardHeader>

                  <CardContent className="px-1 py-3">
                    <p className="line-clamp-1 text-gray-800 dark:text-gray-200 font-semibold text-[15px] text-center">
                      {prod.title}
                    </p>
                  </CardContent>

                  <CardFooter className="px-1">
                    <div className="flex justify-between items-center w-full text-sm font-medium">
                      <span className="text-emerald-700">{prod.price} EGP</span>
                      <span className="flex items-center gap-1 text-yellow-600">
                        {prod.ratingsAverage}
                        <i className="fas fa-star"></i>
                      </span>
                    </div>
                  </CardFooter>
                </Link>

                {/* Add to Cart Button */}
                <div className="mt-4">
                  <AddBtn id={prod.id} />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
