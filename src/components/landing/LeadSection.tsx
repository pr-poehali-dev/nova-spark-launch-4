import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import func2url from '@/../backend/func2url.json'

interface LeadSectionProps {
  isActive: boolean
}

export default function LeadSection({ isActive }: LeadSectionProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(func2url.leads, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone })
      })
      if (res.ok) {
        setStatus('success')
        setName('')
        setPhone('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[#4FC3F7] text-sm font-semibold uppercase tracking-widest">Бесплатно</span>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white mb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Оставьте заявку
      </motion.h2>

      <motion.p
        className="text-neutral-400 text-lg mb-10 max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        Перезвоним в течение 15 минут и согласуем удобное время замера
      </motion.p>

      <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {status === 'success' ? (
          <div className="bg-white/5 border border-[#4FC3F7]/30 rounded-2xl p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#4FC3F7]/10 flex items-center justify-center mx-auto">
              <Icon name="CheckCircle" size={32} className="text-[#4FC3F7]" />
            </div>
            <p className="text-white text-xl font-semibold">Заявка принята!</p>
            <p className="text-neutral-400">Мы перезвоним вам в ближайшее время</p>
            <Button
              variant="ghost"
              className="text-[#4FC3F7] hover:text-[#4FC3F7]/80"
              onClick={() => setStatus('idle')}
            >
              Отправить ещё одну
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-neutral-400 text-sm mb-2 block">Ваше имя</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Иван Иванов"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#4FC3F7] transition-colors"
              />
            </div>
            <div>
              <label className="text-neutral-400 text-sm mb-2 block">Номер телефона</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+7 999 000-00-00"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#4FC3F7] transition-colors"
              />
            </div>
            {status === 'error' && (
              <p className="text-red-400 text-sm">Что-то пошло не так. Попробуйте ещё раз или позвоните нам.</p>
            )}
            <Button
              type="submit"
              size="lg"
              disabled={status === 'loading'}
              className="w-full bg-[#4FC3F7] text-black hover:bg-[#29B6F6] font-semibold disabled:opacity-60"
            >
              {status === 'loading' ? (
                <><Icon name="Loader2" size={16} className="mr-2 animate-spin" />Отправляем...</>
              ) : (
                <>Получить бесплатный замер</>
              )}
            </Button>
            <p className="text-neutral-600 text-xs text-center">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных
            </p>
          </form>
        )}
      </motion.div>
    </section>
  )
}
