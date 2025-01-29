'use client';
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  return (
      <div className="flex-1 flex justify-center items-center bg-gray-100">
        <Carousel className="w-full max-w-lg">
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      {/* Энд зургаа нэмнэ */}
                        <Image
                        src={`/images/image-${index + 1}.jpg`}
                        alt={`Slide ${index + 1}`}
                        width={400}
                        height={400}
                        className="rounded-lg object-cover"
                        />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
  );
}
