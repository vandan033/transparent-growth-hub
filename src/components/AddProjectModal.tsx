
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AddProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectAdded: () => void;
}

interface Contact {
  type: "phone" | "email";
  value: string;
}

interface Milestone {
  title: string;
  completion_percentage: number;
  is_completed: boolean;
}

const AddProjectModal = ({ open, onOpenChange, onProjectAdded }: AddProjectModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [projectDocuments, setProjectDocuments] = useState<File[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    budget: "",
    department: "",
    start_date: "",
    end_date: "",
    status: "planned" as "planned" | "ongoing" | "completed",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProjectDocuments([...projectDocuments, ...Array.from(e.target.files)]);
    }
  };

  const addContact = () => {
    setContacts([...contacts, { type: "phone", value: "" }]);
  };

  const removeContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const updateContact = (index: number, field: "type" | "value", value: string) => {
    const newContacts = [...contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setContacts(newContacts);
  };

  const addMilestone = () => {
    setMilestones([...milestones, { title: "", completion_percentage: 0, is_completed: false }]);
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const updateMilestone = (index: number, field: keyof Milestone, value: string | number | boolean) => {
    const newMilestones = [...milestones];
    newMilestones[index] = { ...newMilestones[index], [field]: value };
    setMilestones(newMilestones);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        const { data: imageData, error: imageError } = await supabase.storage
          .from("project_files")
          .upload(`images/${Date.now()}-${imageFile.name}`, imageFile);

        if (imageError) throw imageError;
        imageUrl = supabase.storage.from("project_files").getPublicUrl(imageData.path).data.publicUrl;
      }

      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .insert({
          ...formData,
          image_url: imageUrl,
          progress: 0,
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // Upload documents
      for (const doc of projectDocuments) {
        const { data: docData, error: docError } = await supabase.storage
          .from("project_files")
          .upload(`documents/${Date.now()}-${doc.name}`, doc);

        if (docError) throw docError;

        const docUrl = supabase.storage.from("project_files").getPublicUrl(docData.path).data.publicUrl;

        await supabase.from("project_documents").insert({
          project_id: projectData.id,
          file_name: doc.name,
          file_url: docUrl,
        });
      }

      // Add contacts
      for (const contact of contacts) {
        await supabase.from("project_contacts").insert({
          project_id: projectData.id,
          contact_type: contact.type,
          contact_value: contact.value,
        });
      }

      // Add milestones
      for (const milestone of milestones) {
        await supabase.from("project_milestones").insert({
          project_id: projectData.id,
          ...milestone,
        });
      }

      toast({
        title: "Success",
        description: "Project created successfully",
      });

      onProjectAdded();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="image">Project Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "planned" | "ongoing" | "completed") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Documents</Label>
              <Input
                type="file"
                multiple
                onChange={handleDocumentChange}
                className="mt-1"
              />
              {projectDocuments.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{projectDocuments.length} files selected</p>
                </div>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Contacts</Label>
                <Button type="button" variant="outline" size="sm" onClick={addContact}>
                  <Plus className="h-4 w-4 mr-1" /> Add Contact
                </Button>
              </div>
              {contacts.map((contact, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Select
                    value={contact.type}
                    onValueChange={(value: "phone" | "email") =>
                      updateContact(index, "type", value)
                    }
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={contact.value}
                    onChange={(e) => updateContact(index, "value", e.target.value)}
                    placeholder={contact.type === "phone" ? "Phone number" : "Email address"}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeContact(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Milestones</Label>
                <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
                  <Plus className="h-4 w-4 mr-1" /> Add Milestone
                </Button>
              </div>
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={milestone.title}
                    onChange={(e) => updateMilestone(index, "title", e.target.value)}
                    placeholder="Milestone title"
                  />
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={milestone.completion_percentage}
                    onChange={(e) =>
                      updateMilestone(index, "completion_percentage", parseInt(e.target.value))
                    }
                    placeholder="Completion %"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeMilestone(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectModal;
