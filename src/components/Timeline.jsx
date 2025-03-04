import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const Timeline = ({ timelineData }) => {
  return (
    <div className="min-h-screen py-10 flex justify-center">
      <div className="w-full px-4">
        <h2 className="text-3xl font-bold text-center pb-6">
          Laryngoscope Timeline
        </h2>

        <VerticalTimeline lineColor="#1F2937">
          {timelineData.map((item) => (
            <VerticalTimelineElement
              key={item.id}
              className="vertical-timeline-element--work w-full"
              // date={`Step ${item.id}`}
              icon={<div className="flex items-center justify-center h-full w-full text-lg font-bold">{item.id}</div>}
              iconClassName="bg-red-500 text-gray-900 font-bold text-lg flex items-center justify-center"
              contentArrowStyle={{ borderRight: "7px solid gray" }}
            // contentStyle={{width:"25vw"}}
            >
              <div className="flex flex-col md:flex-row">
                <div className="flex items-center w-full md:w-1/3">
                  <img src={item.image} alt={item.title} className="object-fill" />
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Timeline;
