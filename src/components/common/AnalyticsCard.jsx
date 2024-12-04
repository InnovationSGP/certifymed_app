import React from "react";

const AnalyticsCard = ({ icon, count, description }) => {
  return (
    <>
      <article className="flex gap-x-[17px] rounded-xl bg-white px-[22px] py-[33px]">
        <span className="grid place-content-center">{icon}</span>
        <div>
          {count && <h2 className="section-heading">{count}</h2>}
          {description && (
            <h6 className="text-shadesOn  mt-2">{description}</h6>
          )}
        </div>
      </article>
    </>
  );
};

export default AnalyticsCard;
