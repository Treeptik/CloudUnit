/*
 * LICENCE : CloudUnit is available under the Affero Gnu Public License GPL V3 : https://www.gnu.org/licenses/agpl-3.0.html
 *     but CloudUnit is licensed too under a standard commercial license.
 *     Please contact our sales team if you would like to discuss the specifics of our Enterprise license.
 *     If you are not sure whether the GPL is right for you,
 *     you can always test our software under the GPL and inspect the source code before you contact us
 *     about purchasing a commercial license.
 *
 *     LEGAL TERMS : "CloudUnit" is a registered trademark of Treeptik and can't be used to endorse
 *     or promote products derived from this project without prior written permission from Treeptik.
 *     Products or services derived from this software may not be called "CloudUnit"
 *     nor may "Treeptik" or similar confusing terms appear in their names without prior written permission.
 *     For any questions, contact us : contact@treeptik.fr
 */

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name webuiApp.ScriptingService
   * @description
   * # ScriptingService
   * Factory in the webuiApp.
   */
  angular
    .module ( 'webuiApp' )
    .factory ( 'ScriptingService', ScriptingService );

    ScriptingService.$inject = [
      '$resource'
    ];


  function ScriptingService ( $resource ) {

    return {
      getListScript: getListScript,
      getScript: getScript,
      addScript: addScript,
      editScript: editScript,
      deleteScript: deleteScript,
      executeScript: executeScript, 
    };

    // list script
    function getListScript ( ) {
      console.log('getListScript');
      var dir = $resource ( 'scripting' );
      return dir.query ( { } ).$promise; 
    }

    // load script
    function getScript ( scriptId ) {
      var dir = $resource ( 'scripting/:id' );
      return dir.get ( { id: scriptId } ).$promise; 
    }

    // create script
    function addScript ( ) {
      var data = {
        scriptContent: scriptContent,
        scriptName: scriptName
      };

      var dir = $resource ( 'scripting' );
      return dir.post ( { }, data ).$promise; 
    }

    // update script
    function editScript ( id, scriptContent, scriptName) {
      var data = {
        scriptContent: scriptContent,
        scriptName: scriptName
      };
      
      var dir = $resource ( 'scripting/:id' );
      return dir.put ( { id: scriptId }, data ).$promise; 
    }

    // delete script
    function deleteScript ( id) {
      var dir = $resource ( 'scripting/:id' );
      return dir.delete ( { id: scriptId }, {} ).$promise; 
    }

    // Execute script
    function executeScript ( id ) {
      var dir = $resource ( 'scripting/:id' );

      return dir.save ( { id: scriptId }, {} ).$promise; 
    }

  }
}) ();

