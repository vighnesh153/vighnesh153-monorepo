import { assertEquals } from "@std/assert";
import { assertSnapshot } from "@std/testing/snapshot";
import { parseProgram } from "./test_utils.ts";
import { formatXmlProgram } from "./format_xml_program.ts";

Deno.test("formatXmlProgram should format xml program", async (t) => {
  const [parser, program] = parseProgram(`
    <?xml 
    
    version="1.0" 
    encoding
    ="utf-8" ?>
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="com.pokemon.charizard">
        <uses-feature android:name="android.hardware.touchscreen" android:required="false" />
        <!-- 
        
        Some stupid comment-->

        <application
            android:allowBackup="true"
            android:label="Pikachu"
            android:supportsRtl="true"
                        >
            <activity
                android:name=".MainActivity"
                android:exported="true"
                android:launchMode="singleTask">
                <intent-filter>
                    <action android:name="android.intent.action.MAIN" />
                    <category android:name="android.intent.category.LAUNCHER" />
                </intent-filter>
            </activity>
      </application>
    </manifest>



    <    pokemon >
      <name
    >
      Pikachu<
    /
    
    name
>
      <
types    comma-separated   =  "true"    >    
      electric, god<  /
      types>
      <
      desc
      >
        
  Best pokemon ever!!!
      
                      </
                  desc    ><
                      /pokemon
                      >
    `);

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 3);
  await assertSnapshot(
    t,
    formatXmlProgram({ program, indentation: 4, sortAttributes: true }),
  );
});
