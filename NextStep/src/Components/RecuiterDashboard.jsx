import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router";
import { Pencil, Trash2, Check, Plus } from "lucide-react";

function OfferTemplates() {
  const { templates, setTemplates, selectedTemplateId, setSelectedTemplateId } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({ id: null, name: "", subject: "", body: "" });

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId) || null;

  const startNew = () => {
    setDraft({ id: null, name: "", subject: "", body: "" });
    setIsEditing(true);
  };

  const startEdit = (t) => {
    setDraft(t);
    setIsEditing(true);
  };

  const saveDraft = () => {
    if (!draft.name.trim() || !draft.subject.trim()) return;
    if (draft.id) {
      setTemplates((prev) => prev.map((t) => (t.id === draft.id ? draft : t)));
    } else {
      const newTemplate = { ...draft, id: Date.now() };
      setTemplates((prev) => [...prev, newTemplate]);
      setSelectedTemplateId(newTemplate.id);
    }
    setIsEditing(false);
  };

  const removeTemplate = (id) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    if (selectedTemplateId === id) setSelectedTemplateId(null);
  };

  return (
    <div className="rd-emailsection">
      <div className="rd-tpl-header">
        <div>
          <h3>Offer email templates</h3>
          <p className="hint">Create a few reusable templates, then pick one when you send an offer.</p>
        </div>
        <button type="button" className="rd-btn" onClick={startNew}>
          <Plus size={15} /> New Template
        </button>
      </div>

      <div className="rd-tpl-grid">
        <div className="rd-tpl-list">
          {templates.length === 0 && !isEditing && (
            <div className="rd-tpl-empty">No templates yet. Create your first one.</div>
          )}
          {templates.map((t) => (
            <div
              key={t.id}
              className={`rd-tpl-card ${selectedTemplateId === t.id ? "selected" : ""}`}
              onClick={() => setSelectedTemplateId(t.id)}
            >
              <div className="rd-tpl-card-top">
                <span className="rd-tpl-name">{t.name}</span>
                {selectedTemplateId === t.id && <Check size={15} />}
              </div>
              <div className="rd-tpl-subject">{t.subject}</div>
              <div className="rd-tpl-actions">
                <button type="button" onClick={(e) => { e.stopPropagation(); startEdit(t); }}>
                  <Pencil size={13} />
                </button>
                <button type="button" onClick={(e) => { e.stopPropagation(); removeTemplate(t.id); }}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="rd-tpl-panel">
          {isEditing ? (
            <>
              <div className="rd-field">
                <label>Template name</label>
                <input
                  type="text"
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  placeholder="e.g. Frontend Internship Offer"
                />
              </div>
              <div className="rd-field">
                <label>Subject</label>
                <input
                  type="text"
                  value={draft.subject}
                  onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
                  placeholder="You're shortlisted for Frontend Engineer at Nexep"
                />
              </div>
              <div className="rd-field">
                <label>Body</label>
                <textarea
                  value={draft.body}
                  onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                  placeholder="Hi {name}, we're excited to offer you..."
                />
              </div>
              <div className="rd-tpl-editor-actions">
                <button type="button" className="rd-btn outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button type="button" className="rd-btn" onClick={saveDraft}>
                  Save Template
                </button>
              </div>
            </>
          ) : selectedTemplate ? (
            <>
              <div className="rd-tpl-preview-label">Active template</div>
              <h4 className="rd-tpl-preview-name">{selectedTemplate.name}</h4>
              <div className="rd-tpl-preview-subject">{selectedTemplate.subject}</div>
              <div className="rd-tpl-preview-body">{selectedTemplate.body}</div>
            </>
          ) : (
            <div className="rd-tpl-empty">Select a template to preview it, or create a new one.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RecruiterDashboard() {
  const { job, candidates } = useContext(AppContext);

  return (
    <div className="rd-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,380;0,9..144,560;1,9..144,420&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .rd-root { min-height: 100vh; background: #ffffff; font-family: 'Inter', sans-serif; color: #0a0a0a; }
        .rd-hero { padding: 56px 48px 24px; max-width: 900px; }
        .rd-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #8a8a86; margin-bottom: 10px; }
        .rd-headline { font-family: 'Fraunces', serif; font-weight: 560; font-size: 34px; line-height: 1.15; margin: 0 0 8px; }
        .rd-sub { font-size: 14px; color: #6b6b68; margin: 0; }
        .rd-actions { display: flex; gap: 16px; padding: 32px 48px; flex-wrap: wrap; }
        .rd-card { flex: 1; min-width: 260px; border: 1px solid rgba(0,0,0,0.1); border-radius: 16px; padding: 28px; background: #f7f6f2; }
        .rd-card h3 { font-family: 'Fraunces', serif; font-size: 20px; margin: 0 0 8px; }
        .rd-card p { font-size: 13px; color: #6b6b68; margin: 0 0 20px; line-height: 1.5; }
        .rd-btn { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; background: #0a0a0a; color: #fff; font-size: 13px; font-weight: 500; border-radius: 999px; cursor: pointer; transition: opacity 0.2s ease; }
        .rd-btn:hover { opacity: 0.85; }
        .rd-btn.outline { background: transparent; color: #0a0a0a; border: 1px solid rgba(0,0,0,0.15); }
        .rd-stats { display: flex; gap: 40px; padding: 8px 48px 32px; border-top: 1px solid rgba(0,0,0,0.08); margin: 8px 48px 0; }
        .rd-stat-num { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 560; }
        .rd-stat-label { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #8a8a86; }

        .rd-emailsection { padding: 8px 48px 56px; }
        .rd-tpl-header { display: flex; align-items: flex-start; justify-content: space-between; max-width: 900px; margin-bottom: 24px; }
        .rd-tpl-header h3 { font-family: 'Fraunces', serif; font-size: 20px; margin: 0 0 4px; }
        .rd-tpl-header .hint { font-size: 13px; color: #6b6b68; margin: 0; max-width: 420px; }

        .rd-tpl-grid { display: grid; grid-template-columns: 280px 1fr; gap: 20px; max-width: 900px; align-items: start; }
        .rd-tpl-list { display: flex; flex-direction: column; gap: 10px; }
        .rd-tpl-card { border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; padding: 14px 16px; background: #fff; cursor: pointer; transition: border-color 0.15s ease, background 0.15s ease; }
        .rd-tpl-card:hover { border-color: rgba(0,0,0,0.25); }
        .rd-tpl-card.selected { border-color: #0a0a0a; background: #f7f6f2; }
        .rd-tpl-card-top { display: flex; align-items: center; justify-content: space-between; }
        .rd-tpl-name { font-size: 14px; font-weight: 600; }
        .rd-tpl-subject { font-size: 12px; color: #6b6b68; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .rd-tpl-actions { display: flex; gap: 8px; margin-top: 10px; }
        .rd-tpl-actions button { all: unset; cursor: pointer; color: #8a8a86; }
        .rd-tpl-actions button:hover { color: #0a0a0a; }
        .rd-tpl-empty { font-size: 13px; color: #8a8a86; padding: 20px; text-align: center; border: 1px dashed rgba(0,0,0,0.15); border-radius: 12px; }

        .rd-tpl-panel { border: 1px solid rgba(0,0,0,0.1); border-radius: 16px; padding: 28px; background: #fff; min-height: 260px; }
        .rd-tpl-preview-label { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #8a8a86; margin-bottom: 8px; }
        .rd-tpl-preview-name { font-family: 'Fraunces', serif; font-size: 20px; margin: 0 0 6px; }
        .rd-tpl-preview-subject { font-size: 13px; font-weight: 600; color: #0a0a0a; margin-bottom: 14px; }
        .rd-tpl-preview-body { font-size: 13px; color: #4a4a48; line-height: 1.6; white-space: pre-wrap; }

        .rd-field { margin-bottom: 16px; }
        .rd-field label { display: block; font-size: 11px; color: #8a8a86; margin-bottom: 7px; text-transform: uppercase; letter-spacing: 0.06em; }
        .rd-field input, .rd-field textarea { width: 100%; padding: 13px 14px; background: #f7f6f2; border: 1px solid transparent; border-radius: 8px; font-size: 14px; font-family: 'Inter', sans-serif; color: #0a0a0a; outline: none; transition: border-color 0.2s ease, background 0.2s ease; }
        .rd-field input:focus, .rd-field textarea:focus { border-color: #0a0a0a; background: #fff; }
        .rd-field textarea { resize: vertical; min-height: 110px; }
        .rd-tpl-editor-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; }
      `}</style>

      <div className="rd-hero">
        <div className="rd-eyebrow">Recruiter Dashboard</div>
        <h1 className="rd-headline">Hire the freshers others overlook.</h1>
        <p className="rd-sub">Post a role, browse candidates, or set up your offer email templates.</p>
      </div>

      <div className="rd-actions">
        <div className="rd-card">
          <h3>Post a job</h3>
          <p>Share a full-time or internship opening.</p>
          <Link to="/postjobs" className="rd-btn">Post a Job →</Link>
        </div>
        <div className="rd-card">
          <h3>Browse candidates</h3>
          <p>See fresher profiles, resumes, and video intros.</p>
          <Link to="/findskills" className="rd-btn outline">Browse Candidates →</Link>
        </div>
      </div>

      <div className="rd-stats">
        <div>
          <div className="rd-stat-num">{job.length}</div>
          <div className="rd-stat-label">Jobs Posted</div>
        </div>
        <div>
          <div className="rd-stat-num">{candidates.length}</div>
          <div className="rd-stat-label">Candidates</div>
        </div>
      </div>

      <OfferTemplates />
    </div>
  );
}