import { useParams } from '@tanstack/react-router'
import { Slide1 } from '../components/Slide1'
import { Slide2 } from '../components/Slide2'

export function SlidePage() {
  const { num } = useParams({ strict: false })

  if (num === '1') return <Slide1 />
  if (num === '2') return <Slide2 />

  return <div>Slide not found</div>
}
