import {
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  forwardRef,
  useEffect,
  useRef,
} from 'react'
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
}

class Particle {
  public x: number
  public y: number
  public vx: number
  public vy: number
  public r: number

  public width = 12
  public height = 12
  public opacity = 1

  public widthDelta = randomNumBetween(0, 360)
  public heightDelta = randomNumBetween(0, 360)
  public rotation = randomNumBetween(0, 360)

  constructor(
    {
      x,
      y,
      deg = 0,
      r = randomNumBetween(10, 30),
      spread = 15,
    }: ParticleOptions,
    private readonly friction = 0.89,
    private readonly gravity = 0.5,
    private readonly angle = (Math.PI / 180) * randomNumBetween(0, 360),

    private readonly rotationDelta = randomNumBetween(-1, 1),
    private readonly colors = ['#00BC68', '#E2F6E9', '#005E16', '#E2F5FF'],
    private readonly color = hexToRgb(
      colors[Math.floor(randomNumBetween(0, colors.length))],
    )!,
    private readonly shapes = ['circle', 'square'],
    private readonly shape = shapes[
      Math.floor(randomNumBetween(0, shapes.length))
    ],
  ) {
    this.r = r
    this.x = x
    this.y = y

    this.vx = this.r * Math.cos(this.angle)
    this.vy = this.r * Math.sin(this.angle)
  }

  update() {
    this.vy += this.gravity

    this.vx *= this.friction
    this.vy *= this.friction

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

  draw(ctx: CanvasRenderingContext2D) {
    ctx.translate(this.x + this.width * 1.2, this.y + this.height * 1.2)
    ctx.rotate((Math.PI / 180) * this.rotation)
    ctx.translate(-this.x - this.width * 1.2, -this.y - this.height * 1.2)
    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`
    switch (this.shape) {
      case 'square':
        this.drawSquare(ctx)
        break
      case 'circle':
        this.drawCircle(ctx)
        break
    }

    ctx.resetTransform()
  }
}

const defaultOptions = {
  fps: 60,
  intervalTime: 1000,
  dpr: typeof window !== 'undefined' && window?.devicePixelRatio > 1 ? 2 : 1,
}

interface ConfettiProps extends HTMLAttributes<HTMLCanvasElement> {}

const Confetti = (props: PropsWithChildren<ConfettiProps>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const clickableRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (canvasRef.current && clickableRef.current) {
      const { dpr, intervalTime, fps } = defaultOptions
      const interval = intervalTime / fps
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        let animationId: number
        const canvas = canvasRef.current
        const canvasWidth = canvas.clientWidth * dpr
        const canvasHeight = canvas.clientHeight * dpr
        canvas.style.width = canvasWidth + 'px'
        canvas.style.height = canvasHeight + 'px'
        canvas.width = canvasHeight
        canvas.height = canvasHeight
        ctx.scale(dpr, dpr)

        const particles: Particle[] = []
        const createConfetti = (event: MouseEvent) => {
          if (!clickableRef.current) return
          const count = 20
          const deg = 0
          const spread = -1

          const po = clickableRef.current?.getBoundingClientRect()
          const x = event.clientX + (po.width / 2) * dpr
          const y = event.clientY - po.height * dpr
          console.log()
          for (let i = 0; i < count; i++) {
            particles.push(new Particle({ x, y, deg, spread }))
          }
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
        const clickable = clickableRef.current

        clickable.addEventListener('click', createConfetti)

        return () => {
          cancelAnimationFrame(animationId)
          clickable.removeEventListener('click', createConfetti)
        }
      }
    }
  }, [])
  const { children, ...rest } = props
  return (
    <>
      <div ref={clickableRef}>{props.children}</div>
      <canvas {...rest} ref={canvasRef} />
    </>
  )
}

export default Confetti
