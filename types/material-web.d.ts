import type React from 'react'

/**
 * Minimal JSX typings for the @material/web custom elements used in this app.
 * Attributes are kebab-case; DOM event handlers are lowercase (onclick, etc.).
 */
type MdElement<T = Record<string, unknown>> = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> &
  T & {
    slot?: string
    disabled?: boolean
  }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-icon': MdElement
      'md-ripple': MdElement
      'md-elevation': MdElement
      'md-divider': MdElement<{ inset?: boolean }>
      'md-linear-progress': MdElement<{
        value?: number
        max?: number
        indeterminate?: boolean
      }>
      'md-circular-progress': MdElement<{
        value?: number
        indeterminate?: boolean
      }>
      'md-filled-button': MdElement<{ href?: string; target?: string; 'trailing-icon'?: boolean; type?: string }>
      'md-filled-tonal-button': MdElement<{ href?: string; target?: string; 'trailing-icon'?: boolean; type?: string }>
      'md-elevated-button': MdElement<{ href?: string; target?: string; 'trailing-icon'?: boolean }>
      'md-outlined-button': MdElement<{ href?: string; target?: string; 'trailing-icon'?: boolean }>
      'md-text-button': MdElement<{ href?: string; target?: string; 'trailing-icon'?: boolean }>
      'md-icon-button': MdElement<{
        href?: string
        target?: string
        toggle?: boolean
        selected?: boolean
      }>
    }
  }
}

export {}
