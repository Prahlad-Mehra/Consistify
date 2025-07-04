import { ReactNode } from 'react';

type FeatureCardProps = {
  IconComponent: React.ElementType;
  color: string; // e.g., "#3671ec"
  heading: string;
  children: ReactNode;
};

export default function StepCard({
  IconComponent,
  color,
  heading,
  children,
}: FeatureCardProps){
    return (
        <div className="group flex flex-col items-center py-0 px-0 transition transform duration-300">
            <div className="p-4 rounded-full transition-transform duration-300 group-hover:scale-120" style={{ backgroundColor: color }}>
                <IconComponent color="#fefffe" className="w-8 h-8" />
            </div>
            
            <h1 className="mt-5 text-center text-xl font-semibold">{heading}</h1>
            <p className="hidden lg:flex text-center mt-4">
                {children}
            </p>
        </div>
    )
}