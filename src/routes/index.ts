import express from "express";
import { userRoutes } from "../app/modules/User/user.routes";
import { AdminRoutes } from "../app/modules/Admin/admin.routes";
import { AuthRoutes } from "../app/modules/Auth/auth.routes";
import { SpecialtiesRoutes } from "../app/modules/Specialties/specialties.routes";
import { DoctorRoutes } from "../app/modules/Doctor/doctor.routes";
import { ScheduleRoutes } from "../app/modules/Schedule/schedule.routes";
import { PatientRoutes } from "../app/modules/Patient/patient.route";
import { DoctorScheduleRoutes } from "../app/modules/DoctorSchedule/doctorSchedule.routes";
import { AppointmentRoutes } from "../app/modules/Appointment/appointment.routes";
import { PaymentRoutes } from "../app/modules/Payment/payment.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/specialties",
    route: SpecialtiesRoutes,
  },
  {
    path: "/doctor",
    route: DoctorRoutes,
  },
  {
    path: "/patient",
    route: PatientRoutes,
  },
  {
    path: "/schedule",
    route: ScheduleRoutes,
  },

  {
    path: "/doctor-schedule",
    route: DoctorScheduleRoutes,
  },
  {
    path: "/appointment",
    route: AppointmentRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
