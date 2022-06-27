vcpkg_from_github(
  OUT_SOURCE_PATH SOURCE_PATH
  REPO Yuki-cpp/typelist_utils
  REF COMMIT_REF
  SHA512 ARCHIVE_SHA
  HEAD_REF HEAD_BRANCH
)

vcpkg_configure_cmake(
  SOURCE_PATH "${SOURCE_PATH}"
  PREFER_NINJA
)
vcpkg_install_cmake()
vcpkg_cmake_config_fixup()

file(REMOVE_RECURSE "${CURRENT_PACKAGES_DIR}/debug")

file(
  INSTALL "${SOURCE_PATH}/LICENSE.md"
  DESTINATION "${CURRENT_PACKAGES_DIR}/share/${PORT}"
  RENAME copyright)