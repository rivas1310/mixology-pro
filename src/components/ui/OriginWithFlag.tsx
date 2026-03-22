'use client'

import {
  countryFlagCdnUrl,
  getCountryCodeFromOrigin,
} from '@/lib/countryFromLabel'

type Props = {
  origin: string
  /** ancho aproximado de la bandera (flagcdn w20 / w40 / w80) */
  flagWidth?: 20 | 40 | 80
  className?: string
  textClassName?: string
}

/**
 * Muestra la bandera del país cuando el texto de origen es reconocible (mapa + variantes).
 */
export function OriginWithFlag({
  origin,
  flagWidth = 40,
  className = '',
  textClassName = '',
}: Props) {
  const code = getCountryCodeFromOrigin(origin)
  const h = flagWidth <= 20 ? 15 : flagWidth <= 40 ? 28 : 54

  return (
    <span
      className={`inline-flex items-center gap-2 flex-wrap ${className}`}
    >
      {code ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={countryFlagCdnUrl(code, flagWidth)}
          alt=""
          width={Math.round(flagWidth * 1.15)}
          height={h}
          className="rounded-sm object-cover shadow-sm shrink-0 border border-black/10 dark:border-white/25"
        />
      ) : null}
      <span className={textClassName}>{origin}</span>
    </span>
  )
}
