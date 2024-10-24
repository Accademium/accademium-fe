import { Check } from "lucide-react";
import {Progress} from "@/components/ui/progress.tsx";

interface ProgressStepsProps {
    stepNumber: number;
    label: string;
    xp: number;
    status: 'In progress' | 'Pending' | 'Completed';
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ stepNumber, label, xp, status }) => {

    return (
         // height/scale have to be adjusted/removed for responsiveness
            <div className="flex items-end justify-start h-[4.5rem] scale-75 font-coolvetica">
                <div className="flex gap-4 items-start">
                    <div className="flex flex-col items-center space-y-2">
                        {status == 'In progress' ? (
                            <div className="rounded-full bg-black p-4" />
                            ) : status == 'Pending' ? (
                                <div className="rounded-full border-2 border-black p-2" >
                                <div className="bg-black p-2 rounded-full"></div>
                            </div>) : (
                                <div className="rounded-full bg-[#488a77] p-2 text-white"><Check /></div>
                        )}
                        <Progress value={
                            status == 'In progress' ? 50 : status == 'Completed' ? 100 : 0
                        }
                                  direction="vertical"
                                  className="h-16"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="flex flex-col -mt-2 font-bold">
                            <h3>
                                Step {stepNumber}
                            </h3>
                            <h3 className="text-xl">
                                {label}
                            </h3>
                        </div>
                        <div className="space-y-1">
                            <h3 className={status == 'Completed' ? "text-[#488a77]"
                                : status == 'In progress' ? "text-black"
                                    : "opacity-15"}>
                                {status}
                            </h3>
                            <h3 className={status == 'Completed' ? "font-bold text-white bg-[#488a77] rounded px-2 py-0.5"
                                : status == 'In progress' ? "font-bold text-white bg-black rounded px-2 py-0.5"
                                    : "font-bold text-white bg-black rounded px-2 py-0.5 opacity-15"}>
                                +{xp} XP
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export { ProgressSteps };