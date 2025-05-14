// Type declarations for third-party modules without type definitions

declare module '@heroicons/react/24/outline' {
  import { ComponentType, SVGProps } from 'react';
  
  export const HomeIcon: ComponentType<SVGProps<SVGSVGElement>>;
  export const ChatBubbleLeftRightIcon: ComponentType<SVGProps<SVGSVGElement>>;
  export const FaceSmileIcon: ComponentType<SVGProps<SVGSVGElement>>;
  export const FireIcon: ComponentType<SVGProps<SVGSVGElement>>;
  export const TrophyIcon: ComponentType<SVGProps<SVGSVGElement>>;
  
  // Add other icons as needed
}

declare module 'sonner' {
  import { ReactNode } from 'react';

  export interface ToasterProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
    toastOptions?: {
      style?: React.CSSProperties;
      className?: string;
    };
    children?: ReactNode;
  }

  export interface ToastOptions {
    id?: string;
    duration?: number;
    icon?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }

  export const Toaster: React.FC<ToasterProps>;

  export const toast: {
    success: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
    info: (message: string, options?: ToastOptions) => void;
    warning: (message: string, options?: ToastOptions) => void;
    custom: (message: ReactNode, options?: ToastOptions) => void;
    dismiss: (id?: string) => void;
  };
}

declare module 'clsx' {
  export default function clsx(...inputs: Array<string | Record<string, boolean> | null | undefined | 0 | false>): string;
} 