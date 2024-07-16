const cron = require("node-cron");
const RecurringTask = require("../models/recurringTask");
const Task = require("../models/task");
const Employee = require("../models/employee");
const {
  sendNotificationToRoles,
} = require("../controllers/services/notificationService");
const { ObjectId } = require("mongoose").Types;

exports.recurringDailyTasks = () => {
  cron.schedule("0 0 * * * ", async () => {
    try {
      // const twentyFourHoursAgo = new Date();
      // twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

      const recurringTasks = await RecurringTask.find({
        type: "DAILY-TASK",
      });

      console.log(recurringTasks);

      for (const recurringTask of recurringTasks) {
        const { title, description, type, assignedEmployee, postedBy } =
          recurringTask;

        // Create a new task based on the recurring task
        const newTask = new Task({
          title,
          description,
          department: recurringTask.department,
          assignedEmployee,
          type,
          postedBy,
          actions: [
            {
              status: "OPEN",
              updatedAt: new Date(),
              updatedBy: recurringTask.postedBy.uid,
              data: assignedEmployee,
            },
          ],
        });

        // Save the new task to the database
        await newTask.save();

        console.log(`New task created from recurring task: ${newTask}`);

        if (
          recurringTask.assignedEmployee &&
          recurringTask.assignedEmployee.employeeCatergory ===
            "FACILITY-MANAGER"
        ) {
          sendNotificationToRoles(recurringTask.assignedEmployee._id, {
            title: `${recurringTask.postedBy.firstName} ${recurringTask.postedBy.lastName} raised a Task!`,
            body: title,
          });
        } else {
          /// Notifiaction
          const departmentManagers = await Employee.find({
            departmentID: recurringTask.department._id,
            employeeCatergory: "DEPARTMENT-MANAGER",
            societyId: recurringTask.postedBy.societyId,
          });

          for (const manager of departmentManagers) {
            sendNotificationToRoles(manager._id, {
              title: `${recurringTask.postedBy.firstName} ${recurringTask.postedBy.lastName} raised a Task!`,
              body: title,
            });
          }
        }
      }
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });
};

function getDayString(dayInteger) {
  const daysOfWeekMap = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };

  return daysOfWeekMap[dayInteger];
}

exports.recurringWeeklyTasks = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      // const twentyFourHoursAgo = new Date();
      // twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

      const recurringTasks = await RecurringTask.find({
        type: "WEEKLY-TASK",
      });

      const currentDate = new Date();
      const currentDayString = getDayString(currentDate.getDay());

      console.log("Current day:", currentDayString);

      for (const recurringTask of recurringTasks) {
        console.log("Task Date:", recurringTask.recurringDayOrMonth);
        if (currentDayString === recurringTask.recurringDayOrMonth) {
          const { title, description, type, assignedEmployee, postedBy } =
            recurringTask;

          // Create a new task based on the recurring task
          const newTask = new Task({
            title,
            description,
            department: recurringTask.department,
            assignedEmployee,
            type,
            postedBy,
            actions: [
              {
                status: "OPEN",
                updatedAt: new Date(),
                updatedBy: recurringTask.postedBy.uid,
                data: assignedEmployee,
              },
            ],
          });

          // Save the new task to the database
          await newTask.save();

          console.log(`New task created from recurring task: ${newTask}`);

          if (
            recurringTask.assignedEmployee &&
            recurringTask.assignedEmployee.employeeCatergory ===
              "FACILITY-MANAGER"
          ) {
            sendNotificationToRoles(recurringTask.assignedEmployee._id, {
              title: `${recurringTask.postedBy.firstName} ${recurringTask.postedBy.lastName} raised a Task!`,
              body: title,
            });
          } else {
            /// Notifiaction
            const departmentManagers = await Employee.find({
              departmentID: recurringTask.department._id,
              employeeCatergory: "DEPARTMENT-MANAGER",
              societyId: recurringTask.postedBy.societyId,
            });

            for (const manager of departmentManagers) {
              sendNotificationToRoles(manager._id, {
                title: `${recurringTask.postedBy.firstName} ${recurringTask.postedBy.lastName} raised a Task!`,
                body: title,
              });
            }
          }
        }
      }
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });
};

// exports.recurringMonthlyTasks = () => {
//   /// One min for test
//   cron.schedule("* * * * *", async () => {
//     /// One min for test
//     // cron.schedule("0 */2 * * *", async () => {
//     try {
//       // const twentyFourHoursAgo = new Date();
//       // twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

//       const recurringTasks = await RecurringTask.find({
//         type: "MONTHLY-TASK",
//       });

//       console.log(recurringTasks);

//       for (const recurringTask of recurringTasks) {
//         const { title, description, type, assignedEmployee, postedBy } =
//           recurringTask;

//         // Create a new task based on the recurring task
//         const newTask = new Task({
//           title,
//           description,
//           department: recurringTask.department,
//           assignedEmployee,
//           type,
//           postedBy,
//           actions: [
//             {
//               status: "OPEN",
//               updatedAt: new Date(),
//               updatedBy: recurringTask.postedBy.uid,
//               data: assignedEmployee,
//             },
//           ],
//         });

//         // Save the new task to the database
//         await newTask.save();

//         console.log(`New task created from recurring task: ${newTask}`);

//         if (
//           recurringTask.assignedEmployee &&
//           recurringTask.assignedEmployee.employeeCatergory ===
//             "FACILITY-MANAGER"
//         ) {
//           sendNotificationToRoles(recurringTask.assignedEmployee._id, {
//             title: `${recurringTask.postedBy.firstName} ${recurringTask.postedBy.lastName} raised a Task!`,
//             body: title,
//           });
//         } else {
//           /// Notifiaction
//           const departmentManagers = await Employee.find({
//             departmentID: recurringTask.department._id,
//             employeeCatergory: "DEPARTMENT-MANAGER",
//             societyId: recurringTask.postedBy.societyId,
//           });

//           for (const manager of departmentManagers) {
//             sendNotificationToRoles(manager._id, {
//               title: `${recurringTask.postedBy.firstName} ${recurringTask.postedBy.lastName} raised a Task!`,
//               body: title,
//             });
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error in cron job:", error);
//     }
//   });
// };
