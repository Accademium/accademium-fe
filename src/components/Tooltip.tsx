import React, { useState } from 'react';

const Tooltip: React.FC<{
  reasonText: string;
  careerProspectsText?: string;
  containerStyle?: string;
  tooltipStyle?: string;
}> = ({
  reasonText,
  careerProspectsText = '',
  containerStyle = '',
  tooltipStyle = '',
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div
      className={`${containerStyle} h-[22px] w-[24px] flex items-center`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <img src='../../images/info-icon.png' width={24} height={22} />
      {visible && (
        <div
          className={`${tooltipStyle} border w-[24rem] rounded-xl bg-white p-6 z-10`}
        >
          <h3 className='font-coolvetica font-light text-xs text-gray-500'>
            {reasonText}
          </h3>
          {careerProspectsText && (
            <h3 className='font-coolvetica font-light text-xs text-black mt-2'>
              {careerProspectsText}
            </h3>
          )}
        </div>
      )}
    </div>
  );
};
export default Tooltip;
