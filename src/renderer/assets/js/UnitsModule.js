import units from './common/units';
import details from './common/details';
import cooldowns from './common/cooldowns';
export default class UnitsModule {
  static getUnits() {
    // [ "Name", "Type", [ "Class1", "Class2" ], Stars, Cost, Combo, Sockets, maxLVL, EXPToMax, lvl1HP, lvl1ATK, lvl1RCV, MAXHP, MAXATK, MAXRCV, Growth Rate ],
    let json = [];
    let i = 1;
    window.units.forEach(element => {
      if (element[0] != "" && i < 5000) {
        var str = "" + i++;
        var pad = "0000";
        var ans = pad.substring(0, pad.length - str.length) + str;
        let unit_table = {};
        unit_table["id"] = ans;
        unit_table["name"] = element[0];
        let typ = element[1];
        unit_table["type"] = Array.isArray(typ) ? typ[0] + "/" + typ[1] : typ;
        let cl = element[2];
        unit_table["class"] = Array.isArray(cl) ? cl[0] + "/" + cl[1] : cl;
        unit_table["hp"] = element[12];
        unit_table["atk"] = element[13];
        unit_table["rcv"] = element[14];
        unit_table["cost"] = element[4];
        unit_table["slots"] = element[6];
        unit_table["stars"] = element[3];
        unit_table["image"] = "https://onepiece-treasurecruise.com/wp-content/uploads/f" + ans + ".png";
        unit_table["image_full"] = "https://onepiece-treasurecruise.com/wp-content/uploads/c" + ans + ".png";
        json.push(unit_table);
      } else {
        i++;
      }
    });
    return json;
  }
  static getUnitDetails(id) {
    let trueId = parseInt(id);
    let detail = window.details[trueId];
    let unit = window.units[trueId - 1];//units.js start from index 0
    let unit_details = {};
    unit_details["id"] = parseInt(id);
    unit_details["image"] = "https://onepiece-treasurecruise.com/wp-content/uploads/c" + id + ".png";
    unit_details["name"] = unit[0];
    let typ = unit[1];
    unit_details["type"] = Array.isArray(typ) ? typ[0] + "/" + typ[1] : typ;
    let cl = unit[2];
    unit_details["class"] = Array.isArray(cl) ? cl[0] + "/" + cl[1] : cl;
    unit_details["hp"] = unit[12];
    unit_details["atk"] = unit[13];
    unit_details["rcv"] = unit[14];
    unit_details["cost"] = unit[4];
    unit_details["slots"] = unit[6];
    unit_details["stars"] = unit[3];
    return unit_details;
  }
}