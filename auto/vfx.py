import os
import sys

def executeConditionalPath(path, callback):
    if not os.path.exists(path):
        print("Creating: ", path)

        callback(path)

def createFile(path, contents):
    file = open(path, "w")
    file.write(contents)
    file.close()

arguments = list(sys.argv)
vfxName = arguments[1]
folderPath = f"../src/VFX/{vfxName}"

executeConditionalPath(
    folderPath,
    lambda path: os.makedirs(path)
)

executeConditionalPath(
    f"../src/VFX/{vfxName}/index.ts",
    lambda path: createFile(
        path,
        "export default presetObject => {\n" +
        "\n" +
        "  return () => {\n" +
        "\n" +
        "  }\n" +
        "}\n"
    )
)

import modules.export
