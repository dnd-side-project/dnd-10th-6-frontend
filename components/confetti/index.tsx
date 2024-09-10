import {
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import * as icon from '@/assets/confetti/index'

const randomNumBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

interface ParticleOptions {
  x: number
  y: number
  deg: number
  r?: number
  spread?: number
  image?: HTMLImageElement
}

class Particle {
  public x: number
  public y: number
  public vx: number
  public vy: number
  public r: number

  public width = randomNumBetween(14, 28)
  public height = randomNumBetween(14, 28)
  public opacity = 1

  public widthDelta = randomNumBetween(0, 360)
  public heightDelta = randomNumBetween(0, 360)
  public rotation = randomNumBetween(0, 360)
  private image: HTMLImageElement | null = null

  constructor(
    { x, y, r = randomNumBetween(20, 55), image }: ParticleOptions,
    private readonly friction = 0.74,
    private readonly gravity = 0.92,
    private readonly angle = (Math.PI / 180) * randomNumBetween(180, 360),
    private readonly rotationDelta = randomNumBetween(-1, 1),
    private readonly colors = ['#00BC68', '#E2F6E9', '#005E16', '#E2F5FF'],
    private readonly color = hexToRgb(
      colors[Math.floor(randomNumBetween(0, colors.length))],
    )!,
    private readonly shapes = ['circle', 'square', 'image'],
    private readonly shape = 'image',
  ) {
    this.r = r
    this.x = x
    this.y = y

    this.vx = this.r * Math.cos(this.angle)
    this.vy = this.r * Math.sin(this.angle)

    this.image = image || null
  }

  update() {
    this.vy += this.gravity

    this.vx *= this.friction + this.friction * 0.1
    this.vy *= this.friction + this.friction * 0.1

    this.x += this.vx
    this.y += this.vy

    this.opacity -= 0.005

    this.widthDelta += 2
    this.heightDelta += 2
    this.rotation += this.rotationDelta
  }

  drawSquare(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(
      this.x,
      this.y,
      this.width * Math.cos((Math.PI / 180) * this.widthDelta),
      this.height * Math.sin((Math.PI / 180) * this.heightDelta),
    )
  }
  drawCircle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.ellipse(
      this.x,
      this.y,
      Math.abs(this.width * Math.cos((Math.PI / 180) * this.widthDelta)) / 2,
      Math.abs(this.height * Math.sin((Math.PI / 180) * this.heightDelta)) / 2,
      0,
      0,
      Math.PI * 2,
    )
    ctx.fill()
    ctx.closePath()
  }

  drawImage(ctx: CanvasRenderingContext2D) {
    if (this.image) {
      const width = this.width * Math.cos((Math.PI / 180) * this.widthDelta)
      const height = this.height * Math.sin((Math.PI / 180) * this.heightDelta)
      ctx.drawImage(this.image, -width / 2, -height / 2, width, height)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate((Math.PI / 180) * this.rotation)

    ctx.globalAlpha = this.opacity

    if (this.shape === 'image' && this.image) {
      this.drawImage(ctx)
    } else {
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 1)`
      switch (this.shape) {
        case 'square':
          this.drawSquare(ctx)
          break
        case 'circle':
          this.drawCircle(ctx)
          break
      }
    }

    ctx.restore()
  }
}

const defaultOptions = {
  fps: 60,
  intervalTime: 1000,
  dpr: typeof window !== 'undefined' && window?.devicePixelRatio > 1 ? 2 : 1,
}

interface ConfettiProps extends HTMLAttributes<HTMLCanvasElement> {
  containerClassName?: string
}

const Confetti = (props: PropsWithChildren<ConfettiProps>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const clickableRef = useRef<HTMLDivElement>(null)

  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([])

  useEffect(() => {
    const loadImages = async () => {
      const images = Object.values(icon)
      const imgPromises = images.map((img) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image()
          image.src = img.src
          image.onload = () => resolve(image)
          image.onerror = reject
        })
      })

      try {
        const loadedImgs = await Promise.all(imgPromises)
        setLoadedImages(loadedImgs)
      } catch (error) {
        console.error('Failed to load images:', error)
      }
    }

    loadImages()
  }, [])

  useEffect(() => {
    if (canvasRef.current && clickableRef.current && loadedImages.length > 0) {
      const { dpr, intervalTime, fps } = defaultOptions
      const interval = intervalTime / fps
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        let animationId: number
        const canvas = canvasRef.current

        // const canvasWidth = canvas.clientWidth * dpr
        // const canvasHeight = canvas.clientHeight * dpr

        const bound = canvas.getBoundingClientRect()

        const canvasWidth = bound.width * dpr
        const canvasHeight = bound.height * dpr
        // canvas.style.width = canvasWidth + 'px'
        // canvas.style.height = canvasHeight + 'px'
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        ctx.scale(dpr, dpr)

        const particles: Particle[] = []
        const createConfetti = () => {
          if (!clickableRef.current) return

          // const count = 20
          const count = randomNumBetween(12, 20)
          const deg = 0
          const spread = -1

          // const po = clickableRef.current?.getBoundingClientRect()
          // const x = event.clientX + (po.width / 2) * dpr
          // const y = event.clientY - po.height * dpr
          const x = canvas.clientWidth / 2
          const y = canvas.clientHeight / 2
          for (let i = 0; i < count; i++) {
            const randomImage =
              loadedImages[Math.floor(Math.random() * loadedImages.length)]
            particles.push(
              new Particle({
                x,
                y,
                deg,
                spread,
                image: randomImage,
              }),
            )
          }

          // for (let i = 0; i < count; i++) {
          //   particles.push(new Particle({ x, y, deg, spread }))
          // }
        }

        const render = () => {
          let now, delta
          let then = Date.now()

          const frame = () => {
            animationId = requestAnimationFrame(frame)
            now = Date.now()
            delta = now - then
            if (delta < interval) return
            ctx.clearRect(0, 0, canvasWidth, canvasHeight)

            for (let i = particles.length - 1; i >= 0; i--) {
              particles[i].update()
              particles[i].draw(ctx)
              if (particles[i].opacity < 0) {
                particles.splice(i, 1)
              }
            }
            then = now - (delta % interval)
          }
          animationId = requestAnimationFrame(frame)
        }

        render()

        // const clickable = clickableRef.current
        // clickable.addEventListener('click', createConfetti)
        createConfetti()
        const intervalId = setInterval(() => {
          createConfetti()
        }, 1200)

        return () => {
          cancelAnimationFrame(animationId)
          // clickable.removeEventListener('click', createConfetti)
          clearInterval(intervalId)
        }
      }
    }
  }, [loadedImages])
  const { children, containerClassName, ...rest } = props
  return (
    <>
      <div ref={clickableRef} className={containerClassName}>
        {props.children}
      </div>
      <canvas {...rest} ref={canvasRef} />
    </>
  )
}

export default Confetti
