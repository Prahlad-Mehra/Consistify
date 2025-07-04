import { lightenColor } from '../../lib/colorUtils';
import { ReactNode } from 'react';

type FeatureCardProps = {
  IconComponent: React.ElementType;
  color: string; // e.g., "#3671ec"
  heading: string;
  children: ReactNode;
};

export default function Card({
  IconComponent,
  color,
  heading,
  children,
}: FeatureCardProps){
    const lightBg = lightenColor(color, 0.85);
    return (
            <div className="flex flex-col items-center p-8 border border-gray-200 rounded-xl transition transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="p-2 rounded-md" style={{ backgroundColor: lightBg }}>
                    <IconComponent color={color} className="w-7 h-7" />
                </div>
                <h1 className="mt-5 text-center text-xl font-semibold">{heading}</h1>
                <p className="hidden lg:flex text-center mt-4">
                    {children}
                </p>
            </div>
)
}