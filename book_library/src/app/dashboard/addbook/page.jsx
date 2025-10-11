"use client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Addbook from "@/components/addbook";

export default function Dashboard() {


  return (
    <section className="pt-32 xl:px-60 lg:px-30 px-20">
      <div className="bg-blue-200 p-8 rounded-2xl w-full shadow-md mt-10">
        <Tabs>
          <TabList className="border-b py-2">
            <Tab>ADD BOOK</Tab>
          </TabList>
          <TabPanel>
            <Addbook />
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
}
