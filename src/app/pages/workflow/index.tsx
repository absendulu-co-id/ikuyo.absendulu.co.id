import * as React from 'react';
import { CardMenu } from '@/app/components';
import { routes } from "@/app/routes";

export interface IWorkflowProps {
}

export default function Workflow (props: IWorkflowProps) {
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {routes.map(
          ({ layout, pages }) =>
            layout === "workflow" &&
            pages.map(({ name, path, image }, index) => (
              <>
                {index > 0 && (
                  <CardMenu
                    key={index}
                    navigate={`/${layout}${path}`}
                    title={name}
                    image={image || ""}
                  />
                )}
              </>
            ))
        )}
      </div>
    </div>
  );
}
