using Dashboard.WebApi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace Dashboard.WebApi.Repository
{
    public class TaskRepositoryJSONFile
    {
        public string FileName { get; set; } = AppDomain.CurrentDomain.GetData("DataDirectory").ToString() + "\\Tasks.json";

        private JsonSerializerSettings settings = new JsonSerializerSettings { TypeNameHandling = TypeNameHandling.Auto };

        private List<Task> __tasks;
        public List<Task> GetTasks(bool refreshFromFile = false)
        {
            if (__tasks == null || refreshFromFile)
            {
                if (File.Exists(FileName))
                {
                    var fileContent = File.ReadAllText(FileName);

                    __tasks = JsonConvert.DeserializeObject<List<Task>>(fileContent, settings);

                    fileContent = null;
                }
                else
                {
                    __tasks = new List<Task>();
                }

            }

            return __tasks;
        }

        public void AddTasks(List<Task> tasksToAdd)
        {
            var currentMaxId = GetTasks(true).Max(t => t.Id);
            foreach (var newTask in tasksToAdd)
            {
                newTask.Id = ++currentMaxId;
            }

            GetTasks().AddRange(tasksToAdd);
            saveTasks();
        }

        public void AddTask(Task taskToAdd)
        {

            taskToAdd.Id = (GetTasks(true).Count == 0) ? 1 : GetTasks().Max(t => t.Id) + 1;
            GetTasks(true).Add(taskToAdd);
            saveTasks();
        }

        public void DeleteTask(int id)
        {
            var taskToRemove = GetTasks(true).SingleOrDefault(t => t.Id == id);
            if(taskToRemove != null)
            {
                GetTasks().Remove(taskToRemove);
                saveTasks();
            }
        }

        private void saveTasks()
        {
            File.WriteAllText(FileName, JsonConvert.SerializeObject(GetTasks(), settings));
        }
    }
}