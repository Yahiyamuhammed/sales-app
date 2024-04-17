// dbfakedatas.js

export const insertSampleData = (db) => {
    const sampleData = [
        ["John", "2024-01-01", "React", "New York", JSON.stringify([["React", "16"], ["Redux", "4"], ["React Router", "5"], ["Jest", "27"]])],
        ["Jane", "2024-02-01", "Vue", "Los Angeles", JSON.stringify([["Vue", "3"], ["Vuex", "4"], ["Vue Router", "4"], ["Vue Test Utils", "1"]])],
        ["Alice", "2024-03-01", "Angular", "Chicago", JSON.stringify([["Angular", "12"], ["RxJS", "6"], ["Angular Material", "12"], ["NgRx", "12"], ["Angular CLI", "12"]])],
        ["Bob", "2024-04-01", "Svelte", "Houston", JSON.stringify([["Svelte", "3"], ["Sapper", "0.28"], ["Svelte Router", "1"], ["Testing Library", "14"], ["Rollup", "2"]])],
        ["Charlie", "2024-05-01", "Ember", "Phoenix", JSON.stringify([["Ember.js", "3"], ["Ember Data", "3.16"], ["Ember CLI", "3.24"], ["Ember Octane", "0.18"], ["Ember FastBoot", "2"]])],
        ["David", "2024-06-01", "Backbone", "Philadelphia", JSON.stringify([["Backbone.js", "1.4"], ["Underscore.js", "1.9"], ["Backbone.Marionette", "4.1"], ["RequireJS", "2.3"]])],
        ["Eve", "2024-07-01", "Meteor", "San Antonio", JSON.stringify([["Meteor", "1.8"], ["MongoDB", "4.2"], ["Blaze", "2.3"], ["SimpleDDP", "1.0"], ["Astronomy", "3.0"]])],
        ["Frank", "2024-08-01", "Polymer", "San Diego", JSON.stringify([["Polymer", "3.0"], ["LitElement", "2.2"], ["Polymer CLI", "3.0"], ["Web Components", "1.0"], ["Polymer App Toolbox", "3.0"]])],
        ["Grace", "2024-09-01", "Aurelia", "Dallas", JSON.stringify([["Aurelia", "1"], ["Babel", "7"], ["Webpack", "5"], ["Aurelia CLI", "1.0"]])],
        ["Helen", "2024-10-01", "Knockout", "San Jose", JSON.stringify([["Knockout", "3.5"], ["jQuery", "3.5"], ["RequireJS", "2.3"], ["Knockout Mapping", "2.4"], ["Knockout Validation", "2.0"]])]
      ];
      
      
      
      sampleData.forEach(([firstName, lastName, framework,place, selectedList]) => {
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO Items (firstName, lastName, framework ,place, items ) values (?, ?, ?, ?,?);',
            [firstName, lastName, framework,place, JSON.stringify(selectedList)],
            (_, result) => {
              console.log('Insertion result:', result);
            },
            (_, error) => {
              console.log('Insertion error:', error);
            }
          );
        });
      });
      
      // Fetch and log the data
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM Items;', [], (_, { rows: { _array } }) => {
          _array.forEach(item => {
            console.log(`ID: ${item.id}, First Name: ${item.firstName}, Last Name: ${item.lastName}, Framework: ${item.framework} ,Items:${item.items}`);
          });
        });
      });
      
    };
  