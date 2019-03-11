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
    public class MenuRepositoryJSONFile
    {
        public string FileName { get; set; } = AppDomain.CurrentDomain.GetData("DataDirectory").ToString() + "\\Menus.json";

        private JsonSerializerSettings settings = new JsonSerializerSettings { TypeNameHandling = TypeNameHandling.Auto };

        private List<Menu> __menus;
        public List<Menu> GetMenus(bool refreshFromFile = false)
        {
            if (__menus == null || refreshFromFile)
            {
                if (File.Exists(FileName))
                {
                    var fileContent = File.ReadAllText(FileName);

                    __menus = JsonConvert.DeserializeObject<List<Menu>>(fileContent, settings);

                    fileContent = null;
                }
                else
                {
                    __menus = new List<Menu>();
                }

            }

            return __menus;
        }

        public void AddMenus(IEnumerable<Menu> menusToAdd)
        {
            GetMenus().AddRange(menusToAdd);
            saveMenus();
        }

        public void AddMenu(Menu menuToAdd)
        {
            GetMenus().Add(menuToAdd);
            saveMenus();
        }

        public IEnumerable<Menu> UpdateRange(IEnumerable<Menu> modifiedMenus)
        {
            var latestFromFile = GetMenus(true);

            foreach (var modifiedMenu in modifiedMenus)
            {
                var matchingExistingMenu = latestFromFile.SingleOrDefault(m => m.Date.Date.CompareTo(modifiedMenu.Date.Date) == 0);
                if(matchingExistingMenu != null)
                {
                    matchingExistingMenu.Description = modifiedMenu.Description;
                }
                else
                {
                    latestFromFile.Add(modifiedMenu);
                }
            }

            saveMenus();

            return GetMenus(true);
        }


        public void AddTestItems()
        {
            var newItems = new Menu[]
            {
                 new Menu { Id=1, Date = DateTime.Now.AddDays(-3), Description = "6 Monday" }
                ,new Menu { Id=2, Date = DateTime.Now.AddDays(-2), Description = "7 Tue" }
                ,new Menu { Id=3, Date = DateTime.Now.AddDays(-1), Description = "8 Wed" }
                ,new Menu { Id=4, Date = DateTime.Now.AddDays(0), Description = "9 Thur Today" }
                ,new Menu { Id=5, Date = DateTime.Now.AddDays(1), Description = "10 Fri" }
                ,new Menu { Id=6, Date = DateTime.Now.AddDays(2), Description = "11 Sat" }
                ,new Menu { Id=7, Date = DateTime.Now.AddDays(3), Description = "12 Sun" }
                ,new Menu { Id=8, Date = DateTime.Now.AddDays(4), Description = "13 Sun" }
                ,new Menu { Id=9, Date = DateTime.Now.AddDays(5), Description = "14 Sun" }

            };

            foreach (var item in newItems)
            {
                item.Description = item.Date.Day + " " + item.Date.DayOfWeek;

                if (item.Date.Date == DateTime.Now.Date)
                {
                    item.Description += " Today";
                }
            }

            AddMenus(newItems);
        }



        private void saveMenus()
        {
            File.WriteAllText(FileName, JsonConvert.SerializeObject(GetMenus().OrderBy(m=>m.Date), settings));
        }

    }
}