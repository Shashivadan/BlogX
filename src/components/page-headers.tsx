import React from 'react'

type PageHeaderProps = {
  title: string;
  description?: string;
} & React.ComponentPropsWithoutRef<"div">;

export default function PageHeader({ title , description , ...rest}:PageHeaderProps) {
  return (
    <div {...rest}>
      <h1 className="text-2xl font-semibold">{title}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}
