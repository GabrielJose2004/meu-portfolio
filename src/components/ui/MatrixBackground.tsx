'use client'

import { useEffect, useRef } from 'react'

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configurar canvas
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const CHAR_WIDTH = 20
    const CHAR_HEIGHT = 20
    const COLUMNS = Math.floor(canvas.width / CHAR_WIDTH)
    const OPACITY = 0.3 // Debug: aumentado para visibilidade
    const SPEED = 0.5 // Velocidade lenta

    // Array de colunas com posição Y
    const drops: number[] = Array(COLUMNS).fill(0)

    // Caracteres minimalistas (predominantemente símbolos, poucos dígitos)
    const chars = '01 .• ▪ ○ ◊'.split('')

    const draw = () => {
      // Fundo semi-transparente para efeito de fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Cor signal (#00ff87) com opacidade muito baixa
      ctx.fillStyle = 'rgba(0, 255, 135, ' + OPACITY + ')'
      ctx.font = '12px "Geist Mono", monospace'
      ctx.textAlign = 'center'

      // Desenhar caracteres
      for (let i = 0; i < COLUMNS; i++) {
        // Apenas alguns caracteres (densidade baixa)
        if (Math.random() > 0.98) {
          const char = chars[Math.floor(Math.random() * chars.length)]
          ctx.fillText(char, i * CHAR_WIDTH + CHAR_WIDTH / 2, drops[i] * CHAR_HEIGHT)

          // Resetar quando chegar embaixo ou aleatoriamente
          if (drops[i] * CHAR_HEIGHT > canvas.height || Math.random() > 0.95) {
            drops[i] = 0
          } else {
            drops[i] += SPEED
          }
        }
      }

      requestAnimationFrame(draw)
    }

    draw()

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
