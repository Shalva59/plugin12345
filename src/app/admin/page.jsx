"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../../../lib/language-context"
import { Button } from "../components/ui/button"
import {
  Plus,
  Pencil,
  Trash2,
  ChevronRight,
  ArrowLeft,
  Users,
  Package,
  FolderOpen,
  Layers,
  X,
  Check,
  Terminal,
  AlertCircle,
} from "lucide-react"

// Default data structure
const defaultData = {
  categories: [
    {
      id: "1",
      name: "Adobe Programs",
      programs: [
        {
          id: "1-1",
          name: "Adobe Photoshop",
          versions: [
            { id: "1-1-1", name: "Photoshop 2023", price: 150 },
            { id: "1-1-2", name: "Photoshop 2024", price: 180 },
            { id: "1-1-3", name: "Photoshop 2025", price: 200 },
          ],
        },
        {
          id: "1-2",
          name: "Adobe Premiere Pro",
          versions: [
            { id: "1-2-1", name: "Premiere Pro 2023", price: 170 },
            { id: "1-2-2", name: "Premiere Pro 2024", price: 200 },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Autodesk Programs",
      programs: [
        {
          id: "2-1",
          name: "AutoCAD",
          versions: [
            { id: "2-1-1", name: "AutoCAD 2023", price: 250 },
            { id: "2-1-2", name: "AutoCAD 2024", price: 300 },
          ],
        },
      ],
    },
  ],
  employees: [
    {
      id: "1",
      name: "გიორგი",
      role: "installer",
      salary: 1000,
      workingOn: "",
      workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      status: "active",
    },
    {
      id: "2",
      name: "ნიკა",
      role: "smm",
      salary: 1200,
      workingOn: "Nitro PDF",
      workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      status: "active",
    },
    {
      id: "3",
      name: "საბა",
      role: "techSupport",
      salary: 900,
      workingOn: "Phones",
      workingDays: ["monday", "wednesday", "friday"],
      status: "active",
    },
    {
      id: "4",
      name: "ლაშა",
      role: "designer",
      salary: 1500,
      workingOn: "",
      workingDays: ["tuesday", "thursday"],
      status: "notActive",
    },
  ],
}

export default function AdminPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("categories") // categories | employees
  const [data, setData] = useState(defaultData)
  const [view, setView] = useState("categories") // categories | programs | versions
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedProgram, setSelectedProgram] = useState(null)

  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("") // category | program | version | employee
  const [modalMode, setModalMode] = useState("add") // add | edit
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("adminData")
    if (savedData) {
      setData(JSON.parse(savedData))
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("adminData", JSON.stringify(data))
  }, [data])

  useEffect(() => {
    if (selectedCategory) {
      const updatedCategory = data.categories.find((cat) => cat.id === selectedCategory.id)
      if (updatedCategory) {
        setSelectedCategory(updatedCategory)
        if (selectedProgram) {
          const updatedProgram = updatedCategory.programs.find((prog) => prog.id === selectedProgram.id)
          if (updatedProgram) {
            setSelectedProgram(updatedProgram)
          }
        }
      }
    }
  }, [data])

  const generateId = () => Math.random().toString(36).substr(2, 9)

  // Category CRUD
  const addCategory = (name) => {
    const newCategory = { id: generateId(), name, programs: [] }
    setData({ ...data, categories: [...data.categories, newCategory] })
  }

  const editCategory = (id, name) => {
    setData({
      ...data,
      categories: data.categories.map((cat) => (cat.id === id ? { ...cat, name } : cat)),
    })
  }

  const deleteCategory = (id) => {
    setData({ ...data, categories: data.categories.filter((cat) => cat.id !== id) })
  }

  // Program CRUD
  const addProgram = (categoryId, name) => {
    const newProgram = { id: generateId(), name, versions: [] }
    setData({
      ...data,
      categories: data.categories.map((cat) =>
        cat.id === categoryId ? { ...cat, programs: [...cat.programs, newProgram] } : cat,
      ),
    })
  }

  const editProgram = (categoryId, programId, name) => {
    setData({
      ...data,
      categories: data.categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, programs: cat.programs.map((prog) => (prog.id === programId ? { ...prog, name } : prog)) }
          : cat,
      ),
    })
  }

  const deleteProgram = (categoryId, programId) => {
    setData({
      ...data,
      categories: data.categories.map((cat) =>
        cat.id === categoryId ? { ...cat, programs: cat.programs.filter((prog) => prog.id !== programId) } : cat,
      ),
    })
  }

  // Version CRUD
  const addVersion = (categoryId, programId, name, price) => {
    const newVersion = { id: generateId(), name, price: Number(price) }
    setData({
      ...data,
      categories: data.categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              programs: cat.programs.map((prog) =>
                prog.id === programId ? { ...prog, versions: [...prog.versions, newVersion] } : prog,
              ),
            }
          : cat,
      ),
    })
  }

  const editVersion = (categoryId, programId, versionId, name, price) => {
    setData({
      ...data,
      categories: data.categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              programs: cat.programs.map((prog) =>
                prog.id === programId
                  ? {
                      ...prog,
                      versions: prog.versions.map((ver) =>
                        ver.id === versionId ? { ...ver, name, price: Number(price) } : ver,
                      ),
                    }
                  : prog,
              ),
            }
          : cat,
      ),
    })
  }

  const deleteVersion = (categoryId, programId, versionId) => {
    setData({
      ...data,
      categories: data.categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              programs: cat.programs.map((prog) =>
                prog.id === programId
                  ? { ...prog, versions: prog.versions.filter((ver) => ver.id !== versionId) }
                  : prog,
              ),
            }
          : cat,
      ),
    })
  }

  // Employee CRUD
  const addEmployee = (employeeData) => {
    const newEmployee = { id: generateId(), ...employeeData }
    setData({ ...data, employees: [...data.employees, newEmployee] })
  }

  const editEmployee = (id, employeeData) => {
    setData({
      ...data,
      employees: data.employees.map((emp) => (emp.id === id ? { ...emp, ...employeeData } : emp)),
    })
  }

  const deleteEmployee = (id) => {
    setData({ ...data, employees: data.employees.filter((emp) => emp.id !== id) })
  }

  // Modal handlers
  const openModal = (type, mode = "add", item = null) => {
    setModalType(type)
    setModalMode(mode)
    setEditingItem(item)
    setErrors({})

    if (mode === "edit" && item) {
      if (type === "employee") {
        setFormData({ ...item })
      } else if (type === "version") {
        setFormData({ name: item.name, price: item.price })
      } else {
        setFormData({ name: item.name })
      }
    } else {
      if (type === "employee") {
        setFormData({
          name: "",
          role: "installer",
          salary: "",
          workingOn: "",
          workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
          status: "active",
        })
      } else if (type === "version") {
        setFormData({ name: "", price: "" })
      } else {
        setFormData({ name: "" })
      }
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData({})
    setErrors({})
  }

  const validateForm = () => {
    const newErrors = {}

    if (modalType === "employee") {
      if (!formData.name || formData.name.trim() === "") {
        newErrors.name = t.admin?.errors?.nameRequired || "Name is required"
      }
      if (formData.salary === "" || formData.salary === undefined || formData.salary === null) {
        newErrors.salary = t.admin?.errors?.salaryRequired || "Salary is required"
      } else if (Number(formData.salary) < 0) {
        newErrors.salary = t.admin?.errors?.salaryNegative || "Salary cannot be negative"
      }
      if (!formData.workingDays || formData.workingDays.length === 0) {
        newErrors.workingDays = t.admin?.errors?.workingDaysRequired || "Select at least one working day"
      }
    } else if (modalType === "version") {
      if (!formData.name || formData.name.trim() === "") {
        newErrors.name = t.admin?.errors?.nameRequired || "Name is required"
      }
      if (formData.price === "" || formData.price === undefined || formData.price === null) {
        newErrors.price = t.admin?.errors?.priceRequired || "Price is required"
      } else if (Number(formData.price) < 0) {
        newErrors.price = t.admin?.errors?.priceNegative || "Price cannot be negative"
      }
    } else {
      // category or program
      if (!formData.name || formData.name.trim() === "") {
        newErrors.name = t.admin?.errors?.nameRequired || "Name is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    if (modalType === "category") {
      if (modalMode === "add") {
        addCategory(formData.name)
      } else {
        editCategory(editingItem.id, formData.name)
      }
    } else if (modalType === "program") {
      if (modalMode === "add") {
        addProgram(selectedCategory.id, formData.name)
      } else {
        editProgram(selectedCategory.id, editingItem.id, formData.name)
      }
    } else if (modalType === "version") {
      if (modalMode === "add") {
        addVersion(selectedCategory.id, selectedProgram.id, formData.name, formData.price)
      } else {
        editVersion(selectedCategory.id, selectedProgram.id, editingItem.id, formData.name, formData.price)
      }
    } else if (modalType === "employee") {
      if (modalMode === "add") {
        addEmployee(formData)
      } else {
        editEmployee(editingItem.id, formData)
      }
    }
    closeModal()
  }

  const toggleWorkingDay = (day) => {
    if (formData.workingDays.includes(day)) {
      setFormData({ ...formData, workingDays: formData.workingDays.filter((d) => d !== day) })
    } else {
      setFormData({ ...formData, workingDays: [...formData.workingDays, day] })
    }
  }

  const getRoleName = (roleKey) => {
    return t.admin?.employee?.roles?.[roleKey] || roleKey
  }

  const getDayName = (dayKey) => {
    return t.admin?.employee?.days?.[dayKey] || dayKey
  }

  // Render Categories View
  const renderCategories = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-emerald-400" />
          {t.admin?.categories || "Categories"}
        </h2>
        <Button onClick={() => openModal("category", "add")} className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          {t.admin?.addCategory || "Add Category"}
        </Button>
      </div>

      {data.categories.length === 0 ? (
        <div className="text-center py-12 text-slate-400">{t.admin?.noCategories || "No categories added"}</div>
      ) : (
        <div className="grid gap-3">
          {data.categories.map((category) => (
            <div
              key={category.id}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center justify-between hover:bg-slate-800 transition-colors"
            >
              <div
                className="flex items-center gap-3 flex-1 cursor-pointer"
                onClick={() => {
                  setSelectedCategory(category)
                  setView("programs")
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Package className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{category.name}</h3>
                  <p className="text-sm text-slate-400">
                    {category.programs.length} {t.admin?.programs || "programs"}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 ml-auto" />
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    openModal("category", "edit", category)
                  }}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteCategory(category.id)
                  }}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // Render Programs View
  const renderPrograms = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => {
            setView("categories")
            setSelectedCategory(null)
          }}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-400" />
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-400" />
            {selectedCategory?.name}
          </h2>
          <p className="text-sm text-slate-400">{t.admin?.programs || "Programs"}</p>
        </div>
        <Button onClick={() => openModal("program", "add")} className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          {t.admin?.addProgram || "Add Program"}
        </Button>
      </div>

      {selectedCategory?.programs.length === 0 ? (
        <div className="text-center py-12 text-slate-400">{t.admin?.noPrograms || "No programs added"}</div>
      ) : (
        <div className="grid gap-3">
          {selectedCategory?.programs.map((program) => (
            <div
              key={program.id}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center justify-between hover:bg-slate-800 transition-colors"
            >
              <div
                className="flex items-center gap-3 flex-1 cursor-pointer"
                onClick={() => {
                  setSelectedProgram(program)
                  setView("versions")
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{program.name}</h3>
                  <p className="text-sm text-slate-400">
                    {program.versions.length} {t.admin?.versions || "versions"}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 ml-auto" />
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    openModal("program", "edit", program)
                  }}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteProgram(selectedCategory.id, program.id)
                  }}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // Render Versions View
  const renderVersions = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => {
            setView("programs")
            setSelectedProgram(null)
          }}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-400" />
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            {selectedProgram?.name}
          </h2>
          <p className="text-sm text-slate-400">{t.admin?.versions || "Versions"}</p>
        </div>
        <Button onClick={() => openModal("version", "add")} className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          {t.admin?.addVersion || "Add Version"}
        </Button>
      </div>

      {selectedProgram?.versions.length === 0 ? (
        <div className="text-center py-12 text-slate-400">{t.admin?.noVersions || "No versions added"}</div>
      ) : (
        <div className="grid gap-3">
          {selectedProgram?.versions.map((version) => (
            <div
              key={version.id}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center justify-between hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{version.name}</h3>
                  <p className="text-sm text-emerald-400 font-semibold">
                    {version.price} {t.admin?.currency || "GEL"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => openModal("version", "edit", version)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => deleteVersion(selectedCategory.id, selectedProgram.id, version.id)}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // Render Employees View
  const renderEmployees = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-400" />
          {t.admin?.employees || "Employees"}
        </h2>
        <Button onClick={() => openModal("employee", "add")} className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          {t.admin?.addEmployee || "Add Employee"}
        </Button>
      </div>

      {data.employees.length === 0 ? (
        <div className="text-center py-12 text-slate-400">{t.admin?.noEmployees || "No employees added"}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t.admin?.employee?.name || "Name"}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t.admin?.employee?.role || "Role"}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">
                  {t.admin?.employee?.salary || "Salary"}
                </th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">
                  {t.admin?.employee?.status || "Status"}
                </th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">
                  {t.admin?.employee?.workingOn || "Working On"}
                </th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {data.employees.map((employee) => (
                <tr key={employee.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                  <td className="py-4 px-4 text-white font-medium">{employee.name}</td>
                  <td className="py-4 px-4 text-slate-300">{getRoleName(employee.role)}</td>
                  <td className="py-4 px-4 text-emerald-400 font-semibold">{employee.salary} GEL</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        employee.status === "active"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-slate-600/50 text-slate-400"
                      }`}
                    >
                      {employee.status === "active"
                        ? t.admin?.employee?.active || "Active"
                        : t.admin?.employee?.notActive || "Not Active"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{employee.workingOn || "—"}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => openModal("employee", "edit", employee)}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4 text-slate-400" />
                      </button>
                      <button
                        onClick={() => deleteEmployee(employee.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )

  // Render Modal
  const renderModal = () => {
    if (!showModal) return null

    const getModalTitle = () => {
      const prefix =
        modalMode === "add"
          ? t.admin?.[`add${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`]
          : t.admin?.[`edit${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`]
      return prefix || (modalMode === "add" ? "Add" : "Edit")
    }

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">{getModalTitle()}</h3>
            <button onClick={closeModal} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="space-y-4">
            {modalType === "employee" ? (
              <>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">{t.admin?.employee?.name || "Name"} *</label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      if (errors.name) setErrors({ ...errors, name: null })
                    }}
                    className={`w-full bg-slate-800 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 ${
                      errors.name ? "border-red-500" : "border-slate-700"
                    }`}
                    placeholder={t.admin?.employee?.namePlaceholder || "Employee name"}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">{t.admin?.employee?.role || "Role"}</label>
                  <select
                    value={formData.role || "installer"}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  >
                    {Object.keys(t.admin?.employee?.roles || {}).map((roleKey) => (
                      <option key={roleKey} value={roleKey}>
                        {getRoleName(roleKey)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">{t.admin?.employee?.salary || "Salary"} *</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.salary || ""}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === "" || Number(value) >= 0) {
                        setFormData({ ...formData, salary: value === "" ? "" : Number(value) })
                        if (errors.salary) setErrors({ ...errors, salary: null })
                      }
                    }}
                    className={`w-full bg-slate-800 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 ${
                      errors.salary ? "border-red-500" : "border-slate-700"
                    }`}
                    placeholder={t.admin?.employee?.salaryPlaceholder || "Salary (GEL)"}
                  />
                  {errors.salary && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.salary}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    {t.admin?.employee?.workingOn || "Working On"}
                  </label>
                  <input
                    type="text"
                    value={formData.workingOn || ""}
                    onChange={(e) => setFormData({ ...formData, workingOn: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    placeholder={t.admin?.employee?.workingOnPlaceholder || "Current project"}
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    {t.admin?.employee?.workingDays || "Working Days"} *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => {
                          toggleWorkingDay(day)
                          if (errors.workingDays) setErrors({ ...errors, workingDays: null })
                        }}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          formData.workingDays?.includes(day)
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                        }`}
                      >
                        {getDayName(day)}
                      </button>
                    ))}
                  </div>
                  {errors.workingDays && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.workingDays}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">{t.admin?.employee?.status || "Status"}</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: "active" })}
                      className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
                        formData.status === "active"
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      {t.admin?.employee?.active || "Active"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: "notActive" })}
                      className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
                        formData.status === "notActive"
                          ? "bg-slate-600 text-white"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      {t.admin?.employee?.notActive || "Not Active"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    {modalType === "category" && (t.admin?.categoryName || "Category Name")}
                    {modalType === "program" && (t.admin?.programName || "Program Name")}
                    {modalType === "version" && (t.admin?.versionName || "Version Name")} *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      if (errors.name) setErrors({ ...errors, name: null })
                    }}
                    className={`w-full bg-slate-800 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 ${
                      errors.name ? "border-red-500" : "border-slate-700"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>
                {modalType === "version" && (
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">{t.admin?.price || "Price"} *</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.price || ""}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === "" || Number(value) >= 0) {
                          setFormData({ ...formData, price: value })
                          if (errors.price) setErrors({ ...errors, price: null })
                        }
                      }}
                      className={`w-full bg-slate-800 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 ${
                        errors.price ? "border-red-500" : "border-slate-700"
                      }`}
                    />
                    {errors.price && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.price}
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              onClick={closeModal}
              variant="outline"
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
            >
              {t.admin?.cancel || "Cancel"}
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white">
              <Check className="w-4 h-4 mr-2" />
              {t.admin?.save || "Save"}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Terminal className="w-8 h-8 text-emerald-400" />
            {t.admin?.title || "Admin Panel"}
          </h1>
          <p className="text-slate-400">{activeTab === "categories" ? t.admin?.categories : t.admin?.employees}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => {
              setActiveTab("categories")
              setView("categories")
              setSelectedCategory(null)
              setSelectedProgram(null)
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "categories"
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-800"
            }`}
          >
            <Package className="w-5 h-5" />
            {t.admin?.categories || "Categories"}
          </button>
          <button
            onClick={() => setActiveTab("employees")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "employees"
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-800"
            }`}
          >
            <Users className="w-5 h-5" />
            {t.admin?.employees || "Employees"}
          </button>
        </div>

        {/* Content */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
          {activeTab === "categories" && (
            <>
              {view === "categories" && renderCategories()}
              {view === "programs" && renderPrograms()}
              {view === "versions" && renderVersions()}
            </>
          )}
          {activeTab === "employees" && renderEmployees()}
        </div>
      </div>

      {/* Modal */}
      {renderModal()}
    </div>
  )
}
