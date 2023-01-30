import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { createLeave } from "../../api";
import { toast } from "react-toastify";

function UserList(props) {
  const formik = useFormik({
    initialValues: {
      startDate: new Date(),
      endDate: new Date(),
      daysCount: 1,
      note: "",
    },
    onSubmit: async (values) => {
      const payload = {
        startDate: values.startDate,
        endDate: values.endDate,
        daysCount: values.daysCount,
      };

      if (values.note) {
        payload.note = values.note;
      }

      const response = await createLeave(payload);
      toast("Applied for leave successfully!");
      formik.resetForm();
      console.log({ response });
    },
  });
  return (
    <div className="apply-leave">
      <form onSubmit={formik.handleSubmit}>
        <label>Leave start</label>
        <input
          type="date"
          name="startDate"
          value={formik.values.startDate}
          onChange={formik.handleChange}
        />
        <label>End start</label>
        <input
          type="date"
          name="endDate"
          value={formik.values.endDate}
          onChange={formik.handleChange}
        />
        <label>Leave count</label>
        <input
          type="number"
          name="daysCount"
          min={1}
          value={formik.values.daysCount}
          onChange={formik.handleChange}
        />
        <label>Leave type / Reason</label>
        <textarea
          name="note"
          value={formik.values.note}
          onChange={formik.handleChange}
          rows="10"
        ></textarea>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default UserList;
