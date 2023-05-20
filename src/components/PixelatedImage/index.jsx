'use client'
import styles from './style.module.css';
import { useRef, useState, useEffect } from 'react';
import NextImage from 'next/image';
import { useInView } from 'react-intersection-observer';

export default function Index({src, src10}) {

    const [dimension, setDimension] = useState({width: 0, height: 0});
    const canvas = useRef(null);

    const { ref, inView } = useInView({
        threshold: 0.75,
        triggerOnce: true
    });

    useEffect(() => {
        if(inView && dimension.width > 0){
            const image = new Image();
            image.onload = () => {
                setTimeout( () => {
                    animate(image);
                }, 150)
            }
            image.src = src
        }
    }, [inView, dimension])

    const drawImage = (image) => {
        const ctx = canvas.current.getContext("2d", {willReadFrequently: true});
        ctx.drawImage(image, 0, 0, dimension.width, dimension.height);
        
    }

    const animate = (image, size=20) => {
        drawImage(image);
        if(size < 5) return;
        
        const w = dimension.width;
        const h = dimension.height;
        const ctx = canvas.current.getContext("2d", {willReadFrequently: true});
        const pixelArr = ctx.getImageData(0, 0, w, h).data;
        for (let y = 0; y < h; y += size) {
          for (let x = 0; x < w; x += size) {
            let pos = (x + y * w) * 4;
            ctx.fillStyle = "rgba(" + pixelArr[pos] + "," + pixelArr[pos + 1] + "," + pixelArr[pos + 2] + "," + pixelArr[pos + 3] + ")";
            ctx.fillRect(x, y, size, size);
          }
        }

        setTimeout( () => {
            animate(image, size/2);
        }, 150)
    }

    return (
        <div className={styles.ImageContainer}>
            <NextImage 
                ref={ref} 
                src={src10}
                width={0}
                height={0}
                onLoadingComplete={(e) => {setDimension({width: e.width, height: e.height})}}
                priority={true}
                alt="image"
            />            
            <canvas ref={canvas} width={dimension.width} height={dimension.height}></canvas>
        </div>
    )
}
