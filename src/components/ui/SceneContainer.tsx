import { forwardRef } from 'react';

interface Props {
  id: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * The outer section carries the stable id used by navigation. Pinned content lives in a child
 * `.scene__pin`, so the section's own offset stays correct while a scene is pinned.
 */
export const SceneContainer = forwardRef<HTMLElement, Props>(function SceneContainer(
  { id, label, className = '', children },
  ref,
) {
  return (
    <section id={id} ref={ref} aria-label={label} className={`scene ${className}`} data-scene={id}>
      {children}
    </section>
  );
});
