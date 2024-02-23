"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { db } from "@/db";
import { cn } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Loader2, Square } from "lucide-react";

const QUESTIONS = [
    {
        question: "You find it easy to introduce yourself to new people.",
    },
    {
        question:
            "You often get so lost in thoughts that you ignore or forget your surroundings.",
    },
    {
        question:
            "You try to respond to your emails as soon as possible and cannot stand a messy inbox.",
    },
    {
        question: "You find it difficult to talk about your feelings.",
    },
    {
        question: "You do not usually initiate conversations.",
    },
];

const IMAGES = [
    "https://staticg.sportskeeda.com/editor/2022/04/39c84-16490363904196-1920.jpg?w=840",
    "https://oyster.ignimgs.com/mediawiki/apis.ign.com/minecraft/4/4e/Minecraft_Pig_LG.png",
    "https://i.pinimg.com/736x/3c/f5/61/3cf5616b310c3ed73f10814be64222c1.jpg",
    "https://assetsio.reedpopcdn.com/minecraft-caves-and-cliffs-update.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
    "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2020/01/buzzy-bees.jpg",
    "https://cdn.vox-cdn.com/thumbor/B7cSZLSab1ZHUBXdcXzoXRJdWX0=/0x0:854x505/1200x800/filters:focal(394x186:530x322)/cdn.vox-cdn.com/uploads/chorus_image/image/68563064/bd0ea75cd9da517467cc637efb30950f_videocover.0.jpg",
];

export default function Home() {
    // const { getUser } = getKindeServerSession();
    // const user = await getUser();

    // const dbUser = user
    //     ? await db.user.findFirst({
    //           where: {
    //               id: user?.id,
    //           },
    //       })
    //     : null;

    const [num, setNum] = useState(0);
    const [total, setTotal] = useState(0);
    const [curr, setCurr] = useState(0);
    const [mobImage, setMobImage] = useState("");

    // const fetchMobImage = async () => {
    //     try {
    //         const response = await fetch(
    //             "http://www.randomnumberapi.com/api/v1.0/random?min=0&max=4&count=1",
    //         );
    //         console.log(response);
    //         // return data[0]; // Adjust this based on your API response structure
    //     } catch (error) {
    //         console.error("Error fetching mob image:", error);
    //     }
    // };

    // useEffect(() => {
    //     if (num > 4) {
    //         // Make API call to fetch mob image
    //         fetchMobImage().then((image) => {
    //             setMobImage(image);
    //         });
    //     }
    // }, [num]);

    return (
        <main className="wrapper flex-center text-3xl md:text-5xl font-semibold min-h-[calc(100vh-6rem)] flex-col">
            {/* <Link
                href={"https://github.com/KevinWu098/kTemp"}
                target="_blank"
                referrerPolicy="no-referrer"
                className="underline"
            >
                Hello World 💖
            </Link> */}

            <h1
                style={
                    {
                        "--image-url": `url('minecraft.webp')`,
                    } as any
                }
                className="text-6xl font-bold bg-[image:var(--image-url)]"
            >
                What Minecraft Mob Are U?
            </h1>

            {num > 4 ? (
                <div className="pt-24 space-y-8">
                    <h2 className="text-5xl text-center">YOU ARE A...</h2>
                    <div className="w-[1000px] h-[500px]">
                        <img
                            className="w-[1000px] h-[500px] bg-cover"
                            src={IMAGES[Math.floor(Math.random() * 6)]}
                            alt="wb"
                        />
                    </div>
                </div>
            ) : (
                <div className="flex-center flex-col gap-y-10 pt-24">
                    <p className="flex-center text-center">
                        {QUESTIONS[num].question}
                    </p>
                    <RadioGroup
                        defaultValue="n"
                        className="flex flex-row gap-x-6"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="vu"
                                id="r1"
                                className="w-8 h-8"
                                onClick={() => setCurr(-3)}
                            />
                            <Label htmlFor="r1" className="text-2xl">
                                Very Unlikely
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="u"
                                id="r2"
                                className="w-8 h-8"
                                onClick={() => setCurr(-1)}
                            />
                            <Label htmlFor="r2" className="text-2xl">
                                Unlikely
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="n"
                                id="r3"
                                className="w-8 h-8"
                                onClick={() => setCurr(0)}
                            />
                            <Label htmlFor="r3" className="text-2xl">
                                Neutral
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="l"
                                id="r4"
                                className="w-8 h-8"
                                onClick={() => setCurr(1)}
                            />
                            <Label htmlFor="r4" className="text-2xl">
                                Likely
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="vl"
                                id="r5"
                                className="w-8 h-8"
                                onClick={() => setCurr(3)}
                            />
                            <Label htmlFor="r5" className="text-2xl">
                                Very Likely
                            </Label>
                        </div>
                    </RadioGroup>

                    <Button
                        onClick={() => {
                            setNum((prevNum) => prevNum + 1);
                            setTotal((prevTotal) => (prevTotal += curr));
                            setCurr(0);
                        }}
                        disabled={num == 6}
                        className={cn(num > 5 && "hidden")}
                    >
                        Next
                    </Button>
                </div>
            )}
        </main>
    );
}
